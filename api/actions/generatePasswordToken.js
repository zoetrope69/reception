import db from '../db';
import sendEmail from '../email';
import crypto from 'crypto';

const getRandomToken = (callback) => {
  // generate a random token
  crypto.randomBytes(48, (ex, buffer) => {
    const token = buffer.toString('base64').replace(/[^\w\s]/gi, '');
    callback(token);
  });
};

export default function generatePasswordToken(req) {
  return new Promise((resolve, reject) => {

    const email = req.body.email;
    const invite = req.body.invite;

    db.view('people/byEmail', { key: email }, (err, data) => {
      if (err) {
        return reject(err);
      }

      if (data.length < 1) {
        return reject('Not a valid email');
      }

      const person = data[0].value;

      // create token
      getRandomToken((token) => {
      // token is unique number, with a timeout date stored along side


        // TODO: add timeout
        // assign token to person
        person.token = token;

        // sync changes to person
        db.merge(person._id, person, (dbErr) => {
          if (dbErr) {
            return reject(dbErr);
          }


          // send token to person via email
          let subject = 'Reset your password!';
          let message = `Hey ${person.name.first}!`;

          if (invite) {
            subject = `Hey ${person.name.first}!`;
            subject += "Here's your invite to the Innovation Space's reception app system.";

            message += "\n\r\nYou've been invited to the Innovation Space's reception app system.";
            message += '\n\r\nSign up here: ';
          } else {
            message += '\n\r\nReset password now: ';
          }

          // add url
          message += '\n\r\nhttps://reception.innovationspace.org.co.uk/password/reset?token=' + token;

          const emailToSend = person.email;
          const name = person.name.first;

          sendEmail(subject, message, emailToSend, name, (emailErr, emailMessage) => {
            if (emailErr) {
              return reject(err);
            }
            console.log('message', emailMessage);

            return resolve('Sent email message: ', emailMessage);
          });

        });

      });

    });

  });
}
