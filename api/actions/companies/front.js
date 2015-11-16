import db from '../../db';

function sanitizeData(data) {
  let json = data;

  // if this is an array of objects map the data out
  if (json instanceof Array) {

    json = json.map((dataItem) => {

      // remove passwords
      if (typeof dataItem.password !== 'undefined') {
        delete dataItem.password;
      }

      // remove tokens
      if (typeof dataItem.token !== 'undefined') {
        delete dataItem.token;
      }

      return dataItem;
    });

  }

  return json;
}

export default function front(req) {
  return new Promise((resolve, reject) => {

    if (!req.user || typeof req.user === 'undefined') { // if no user at all

      db.view('companies/byId', (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        const companies = sanitizeData(companiesData);

        resolve(companies);
      });

    }

  });
}
