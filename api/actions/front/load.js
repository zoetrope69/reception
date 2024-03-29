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

export default function load() {
  return new Promise((resolve, reject) => {
    db.view('people/byId', (peopleErr, peopleData) => {
      if (peopleErr) {
        reject(peopleErr);
      }

      const people = sanitizeData(peopleData);

      db.view('companies/byId', (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        const companies = sanitizeData(companiesData);

        resolve({ people, companies });
      });
    });
  });
}
