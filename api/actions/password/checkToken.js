import db from '../../db';

export default function checkToken(req) {
  return new Promise((resolve, reject) => {

    const token = req.body.token;

    if (!token) {
      reject('No password reset token sent to check');
    }

    db.view('people/byToken', { key: token }, (err, data) => {
      if (err) {
        return reject(err);
      }

      if (data.length <= 0) {
        return reject('Password reset token is invalid');
      }

      return resolve(token);

    });

  });
}
