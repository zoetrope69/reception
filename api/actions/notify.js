import db from '../db';
import sendEmail from '../email';
import sendSms from '../sms';

export default function notify(req) {
  return new Promise((resolve, reject) => {

    const inputPerson = req.body.person;

    db.view('people/byId', { key: inputPerson._id }, (err, data) => {
      if (err) {
        return reject(err);
      }

      if (data.length < 1) {
        return reject('Not a valid person');
      }

      const person = data[0].value;

      if (!person.notificationSms && !person.notificationEmail) {
        return reject('No notifications set...');
      }

      // send token to person via email
      const subject = `Someones here to see you, ${person.firstName}!`;

      let message = 'Someone\'s here to see you in the reception.';
      message += '\n\r\nYour details can be changed here: ';

      // add url
      if (process.env.NODE_ENV !== 'production') {
        message += 'http://localhost:3000/';
      } else {
        message += 'https://reception.innovationspace.org.co.uk/';
      }

      const emailToSend = person.email;
      const smsToSend = person.phone;
      const name = person.firstName;

      if (person.notificationEmail) {

        sendEmail('🔔 ' + subject, message, emailToSend, name, (emailErr, emailMessage) => {
          if (emailErr) {
            return reject(emailErr);
          }

          console.log('emailMessage', emailMessage);

          return resolve(emailToSend);
        });

      }

      if (person.notificationSms) {

        sendSms('🔔 ' + message, smsToSend, (smsErr, smsMessage) => {
          if (smsErr) {
            return reject(smsErr);
          }

          console.log('smsMessage', smsMessage);

          return resolve(smsToSend);
        });

      }

    });

  });
}
