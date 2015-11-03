import load from './load';

export default function update(req) {
  return new Promise((resolve, reject) => {
    // write to database

    const settings = load(req);
    const setting = req.body;

    if (setting.type === 'Hot Desk') {
      reject({
        type: 'We do not accept hot types' // example server-side validation error
      });
    }

    if (setting.id) {
      settings[setting.id - 1] = setting;  // id is 1-based. please don't code like this in production! :-)
    }

    resolve(setting);
  });
}
