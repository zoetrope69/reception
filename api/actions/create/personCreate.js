import db from '../../db';

export default function personCreate(req) {
  return new Promise((resolve, reject) => {
    const person = req.body.person;

    if (!req.user || typeof req.user === 'undefined') { // if no user at all
      reject('No user');
      return;
    }

    if (!person) {
      reject('No person sent');
      return;
    }

    if (req.user.role === 'admin' && (typeof person.company === 'undefined' || person.company.length <= 0)) {
      reject('No company selected');
      return;
    }

    // add default attributes
    person.resource = 'person';
    person.role = 'member';
    person.notificationEmail = false;
    person.notificationSms = false;
    person.type = 'Hot Desk';
    person.visibility = false;

    db.view('people/byEmail', { key: person.email }, (peopleErr, peopleData) => {
      if (peopleErr) {
        reject(peopleErr);
      }

      if (peopleData.length > 0) {
        reject('Email is already in use');
        return;
      }

      if (req.user.role === 'admin') {
        db.view('companies/byId', { key: person.company }, (companiesErr, companiesData) => {
          if (companiesErr) {
            reject(companiesErr);
          }

          if (companiesData.length <= 0) {
            reject('No company selected');
          }

          const company = companiesData[0].value;

          // remove company field
          delete person.company;

          db.save(person, (personErr, personData) => {
            if (personErr) {
              reject(personErr);
            }

            // add user to company
            company.people.push(personData._id);

            db.merge(company._id, company, (err) => {
              if (err) {
                reject(err);
              }

              console.log('personData', personData);

              resolve(`Cool, ${person.firstName}, has been created!`);
            });
          });
        });
      } else if (req.user.role === 'owner') {
        db.view('companies/byId', (companiesErr, companiesData) => {
          if (companiesErr) {
            reject(companiesErr);
          }

          const newCompaniesData = companiesData.map(company => company);
          const company = newCompaniesData.find(companyData => companyData.people.find(personData => personData === req.user._id));

          db.save(person, (personErr, personData) => {
            if (personErr) {
              reject(personErr);
            }

            // add user to company
            company.people.push(personData._id);

            db.merge(company._id, company, (err) => {
              if (err) {
                reject(err);
              }

              resolve(`Cool, ${person.firstName}, has been created!`);
            });
          });
        });
      } else {
        reject('You don\'t have permission to create a user');
      }
    });
  });
}
