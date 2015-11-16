import db from '../../db';

export default function update(req) {
  return new Promise((resolve, reject) => {

    const company = req.body;

    if (!req.user || typeof req.user === 'undefined') { // if no user at all

      reject('No user');
      return;

    }

    if (req.user.role === 'admin') {

      db.merge(company._id, company, (err) => {
        if (err) {
          reject(err);
        }

        resolve(company);
      });

    } else if (req.user.role === 'owner') {

      db.view('companies/byId', (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        const newCompaniesData = companiesData.map(companyData => companyData);
        const companyData = newCompaniesData.find(companyDataItem => companyDataItem.people.find(personData => personData === req.user._id));

        if (company._id !== companyData._id) {
          reject('You don\'t have permission to update this');
        }

        db.merge(company._id, company, (err) => {
          if (err) {
            reject(err);
          }

          resolve(companyData);
        });

      });

    } else {

      reject('You don\'t have permission to update this company');

    }

  });
}
