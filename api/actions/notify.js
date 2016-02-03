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
        message += 'https://reception.innovationspace.org.uk/';
      }

      const emailToSend = person.email;
      const smsToSend = person.phone;
      const name = person.firstName;

      // if the person shouldn't be notified then fail the notification
      if (!person.notificationEmail && !person.notificationSms) {
        return reject('User has not notification set so shouldnt be notified');
      }

      const promises = [];

      if (person.notificationEmail) {
        promises.push(
          new Promise((resolvePromise, rejectPromise) => {
            sendEmail('👋 ' + subject, message, emailToSend, name, (emailErr, emailMessage) => {
              if (emailErr) {
                // TODO: log error
                return rejectPromise('Failed to send a notification to ' + emailToSend);
              }

              console.log('emailMessage', emailMessage);

              return resolvePromise(emailToSend);
            });
          })
        );
      }

      if (person.notificationSms) {
        promises.push(
          new Promise((resolvePromise, rejectPromise) => {
            sendSms('👋 ' + message, smsToSend, (smsErr, smsMessage) => {
              if (smsErr) {
                // TODO: log error
                return rejectPromise('Failed to send a notification to ' + smsToSend);
              }

              console.log('smsMessage', smsMessage);

              return resolvePromise(smsToSend);
            });
          })
        );
      }

      Promise.all(promises)
        .then((result) => {
          console.log('result', result);
          resolve(result);
        }, (reason) => {
          console.log('reason', reason);
          reject(reason);
        });
    });
  });
}
