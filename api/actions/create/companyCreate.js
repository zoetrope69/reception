import db from '../../db';

export default function companyCreate(req) {
  return new Promise((resolve, reject) => {

    const inputData = req.body.company;

    if (!req.user || typeof req.user === 'undefined') { // if no user at all

      reject('No user');
      return;

    }

    if (!inputData) {
      reject('No data sent');
      return;
    }

    const person = {
      firstName: inputData.personFirstName,
      lastName: inputData.personLastName,
      email: inputData.personEmail,
    };

    // add default attributes
    person.resource = 'person';
    person.role = 'owner';
    person.notificationEmail = false;
    person.notificationSms = false;
    person.type = 'Hot Desk';
    person.visibility = false;
    person.image = 'default.png';

    db.view('people/byEmail', { key: person.email }, (peopleErr, peopleData) => {
      if (peopleErr) {
        reject(peopleErr);
      }

      if (peopleData.length > 0) {
        reject('Email is already in use');
        return;
      }

      if (req.user.role === 'admin') {

        const company = {
          resource: 'company',
          location: inputData.location,
          name: inputData.name,
          visibility: false,
          people: []
        };

        db.save(person, (personErr, personData) => {
          if (personErr) {
            reject(personErr);
          }

          // add user to company
          company.people.push(personData._id);

          db.save(company, (err, companyData) => {
            if (err) {
              reject(err);
            }

            resolve(companyData);
          });

        });

      } else {
        reject('You don\'t have permission to create a company');
      }

    });


  });
}
