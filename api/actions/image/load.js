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

export default function load(req) {
  return new Promise((resolve, reject) => {
    if (!req.user || typeof req.user === 'undefined') { // if no user at all
      reject('No user');
      return;
    }

    if (req.user.role === 'admin') {
      // get all companies
      // get all members

      db.view('people/byId', (peopleErr, peopleData) => {
        if (peopleErr) {
          reject(peopleErr);
        }

        const people = sanitizeData(peopleData);

        resolve(people);
      });
    } else if (req.user.role === 'owner') {
      // get user's company
      // get user's company's members
      // get profile page for user

      db.view('companies/byId', (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        const newCompaniesData = companiesData.map(company => company);
        const company = newCompaniesData.find(companyData => companyData.people.find(person => person === req.user._id));

        const companyPeople = company.people;

        db.view('people/byId', (peopleErr, peopleData) => {
          if (peopleErr) {
            reject(peopleErr);
          }

          const newPeopleData = peopleData.map(person => person);
          const people = sanitizeData(newPeopleData.filter(person => companyPeople.indexOf(person._id) !== -1));

          resolve(people);
        });
      });
    } else if (req.user.role === 'member') {
      // get profile page for user

      db.view('people/byId', { key: req.user._id }, (peopleErr, peopleData) => {
        if (peopleErr) {
          reject(peopleErr);
        }

        const people = sanitizeData(peopleData);

        resolve(people);
      });
    }
  });
}
