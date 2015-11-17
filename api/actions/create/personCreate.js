import db from '../../db';

export default function personCreate(req) {
  return new Promise((resolve, reject) => {

    const person = req.body.person;

    console.log(person);

    if (!req.user || typeof req.user === 'undefined') { // if no user at all

      reject('No user');
      return;

    }

    if (!person) {
      reject('No person sent');
      return;
    }

    // add default attributes
    person.resource = 'person';
    person.role = 'member';
    person.notificationEmail = false;
    person.notificationSms = false;
    person.type = 'Hot Desk';
    person.visibility = false;
    person.image = 'default.png';

    if (req.user.role === 'admin') {

      db.view('companies/byId', { key: person.company }, (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        if (companiesData.length < 0) {
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

          db.merge(company._id, company, (err, companyData) => {
            if (err) {
              reject(err);
            }

            resolve(companyData);
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

          db.merge(company._id, company, (err, companyData) => {
            if (err) {
              reject(err);
            }

            resolve(companyData);
          });

        });

      });

    } else {
      reject('You don\'t have permission to create a user');
    }


  });
}
