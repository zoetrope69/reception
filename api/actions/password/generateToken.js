import db from '../../db';
import sendEmail from '../../email';
import crypto from 'crypto';

const getRandomToken = (callback) => {
  // generate a random token
  crypto.randomBytes(48, (ex, buffer) => {
    const token = buffer.toString('base64').replace(/[^\w\s]/gi, '');
    callback(token);
  });
};

export default function generateToken(req) {
  return new Promise((resolve, reject) => {

    const email = req.body.email;
    const invite = req.body.invite;

    if (email.length < 1) {
      return reject('Please enter your email address');
    }

    db.view('people/byEmail', { key: email }, (err, data) => {
      if (err) {
        return reject(err);
      }

      if (data.length < 1) {
        // while this isn't a valid email we don't want information to be leaked
        // to potential abusers
        return resolve(email);
      }

      const person = data[0].value;

      // create token
      getRandomToken((token) => {
      // token is unique number, with a timeout date stored along side


        // TODO: add timeout
        // assign token to person
        person.token = token;

        // if an invitation to the system
        if (invite) {
          if (person.registered) {
            // check if they've already been registered
            return reject('Person is already registered...');
          }

          // otherwise set them as registered
          person.invited = true;
          person.registered = false;
        }

        // sync changes to person
        db.merge(person._id, person, (dbErr) => {
          if (dbErr) {
            return reject(dbErr);
          }

          // send token to person via email
          let subject = 'Reset your password!';
          let message = `Hey ${person.firstName}!`;

          if (invite) {
            subject = `Hey ${person.firstName}! `;
            subject += "Here's your invite to the Innovation Space's reception app system.";

            message += "\n\r\nYou've been invited to the Innovation Space's reception app system.";
            message += '\n\r\nLet visitors notify you when they arrive in reception!';
            message += '\n\r\nSign up here: ';
          } else {
            message += '\n\r\nReset password now: ';
          }

          // add url
          if (process.env.NODE_ENV !== 'production') {
            message += '\n\r\nhttp://localhost:3000/password/reset?token=' + token;
          } else {
            message += '\n\r\nhttps://reception.innovationspace.org.uk/password/reset?token=' + token;
          }

          if (invite) {
            message += '&invite=' + encodeURIComponent(person.firstName);
          }


          const emailToSend = person.email;
          const name = person.firstName;

          sendEmail(subject, message, emailToSend, name, (emailErr, emailMessage) => {
            if (emailErr) {
              return reject(err);
            }

            console.log('emailMessage', emailMessage);

            return resolve(emailToSend);
          });

        });

      });

    });

  });
}
