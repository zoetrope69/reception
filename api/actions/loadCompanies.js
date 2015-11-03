import db from '../db';

export default function loadCompanies() {
  return new Promise((resolve, reject) => {
    db.view('companies/all', (err, data) => {
      if (err) {
        reject(err);
      }

      let json = JSON.parse(data);

      // if this is an array of objects map the data out
      if (json instanceof Array) {

        json = json.map((dataItem) => {
          const item = dataItem.value;

          // remove passwords
          if (typeof item.password !== 'undefined') {
            delete item.password;
          }

          // remove tokens
          if (typeof item.token !== 'undefined') {
            delete item.token;
          }

          return item;
        });

      }

      resolve(json);

    });
  });
}
