import db from '../../db';

export default function update(req) {
  return new Promise((resolve, reject) => {

    const setting = req.body;

    /*
    if (setting.type === 'Hot Desk') {
      reject({
        type: 'We do not accept hot types' // example server-side validation error
      });
    }
    */

    db.merge(setting._id, setting, (err) => {
      if (err) {
        reject(err);
      }

      resolve(setting);
    });
  });
}
