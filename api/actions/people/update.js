import db from '../../db';

export default function update(req) {
  return new Promise((resolve, reject) => {

    const person = req.body;

    if (!req.user || typeof req.user === 'undefined') { // if no user at all

      reject('No user');
      return;

    }

    if (req.user.role === 'admin') {

      db.merge(person._id, person, (err) => {
        if (err) {
          reject(err);
        }

        resolve(person);
      });

    } else if (req.user.role === 'owner') {

      db.view('companies/byId', (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        const newCompaniesData = companiesData.map(company => company);
        const company = newCompaniesData.find(companyData => companyData.people.find(personData => personData === req.user._id));

        const companyPeople = company.people;

        if (companyPeople.indexOf(person._id) <= -1) {
          return reject('You don\'t have permission to update this user');
        }

        db.merge(person._id, person, (err) => {
          if (err) {
            reject(err);
          }

          resolve(person);
        });

      });

    } else if (req.user.role === 'member') {

      if (req.user._id !== person._id) {
        reject('You don\'t have permission to update this user');
      }

      db.merge(person._id, person, (err) => {
        if (err) {
          reject(err);
        }

        resolve(person);
      });

    } else {
      reject('You don\'t have permission to update this user');
    }


  });
}
