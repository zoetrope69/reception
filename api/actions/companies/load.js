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

      db.view('companies/byId', (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        const companies = sanitizeData(companiesData);

        resolve(companies);
      });

    }else if (req.user.role === 'owner') {
      // get user's company
      // get user's company's members
      // get settings page for user

      db.view('companies/byId', (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        const newCompaniesData = companiesData.map(company => company);
        const company = newCompaniesData.find(companyData => companyData.people.find(person => person === req.user._id));
        const companies = [company];

        resolve(companies);
      });

    }else if (req.user.role === 'member') {
      // get settings page for user

      db.view('companies/byId', { key: req._id }, (companiesErr, companiesData) => {
        if (companiesErr) {
          reject(companiesErr);
        }

        const companies = sanitizeData(companiesData);

        resolve(companies);
      });

    }

  });
}
