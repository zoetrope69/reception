import db from '../../db';

export default function checkEmail(req) {
  return new Promise((resolve, reject) => {
    const email = req.body.email;

    if (!email) {
      reject('No email sent to check');
    }

    db.view('people/byEmail', { key: email }, (err, data) => {
      if (err) {
        return reject(err);
      }

      if (data.length > 0) {
        return reject('Email in use already');
      }

      return resolve(email);
    });
  });
}
