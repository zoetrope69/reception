import db from '../../db';
import sendEmail from '../../email';
import bcrypt from 'bcrypt';

const cryptPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return callback(err);
    }

    bcrypt.hash(password, salt, (hashErr, hash) => {

      if (hashErr) {
        return callback(err);
      }

      return callback(err, hash);
    });

  });
};

export default function reset(req) {
  return new Promise((resolve, reject) => {

    const token = req.body.token;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    const invite = req.body.invite;

    if (passwordConfirm !== password) {
      return reject('Confirmed new password doesn\'t match new password');
    }else if (passwordConfirm.length < 8 && passwordConfirm.length < 8) {
      return reject('Password needs to be at least 8 characters');
    }

    db.view('people/byToken', { key: token }, (err, data) => {

      if (err) {
        return reject(err);
      }

      if (data.length <= 0) {
        return reject('Password reset token is invalid');
      }

      const person = data[0].value;

      cryptPassword(password, (hashErr, hash) => {
        if (hashErr) {
          return reject(hashErr);
        }

        // assign hash as new pass
        person.password = hash;

        // remove token
        // TODO: remove token field completely
        person.token = false;

        db.merge(person._id, person, (dbErr) => {
          if (dbErr) {
            return reject(dbErr);
          }

          // send token to person via email
          let subject = 'Password reset!';
          let message = `Hey ${person.firstName}! `;


          if (invite) {
            subject = 'Account created!';
            message += 'Your account has been created!';
          } else {
            message += 'Your password has been reset!';
          }

          // add url
          if (process.env.NODE_ENV === 'production') {
            message += '\n\r\nLog in: https://reception.innovationspace.org.uk/login/';
          } else {
            message += '\n\r\nLog in: http://localhost:3000/login/';
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
