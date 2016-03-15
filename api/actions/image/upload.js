import db from '../../db';
import fs from 'fs';

function decodeBase64Image(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

function writeImage(image, id, reject, resolve) {
  const imageBuffer = decodeBase64Image(image);
  console.log('imageBuffer', imageBuffer);

  const date = +new Date();
  const imagePath = `/images/${id}_${date}.jpg`;

  fs.writeFile('static' + imagePath, imageBuffer.data, (err) => {
    if (err) {
      return reject('Something went wrong uploading the image...');
    }

    db.merge(id, { image: imagePath }, (dbErr) => {
      if (dbErr) {
        reject(dbErr);
      }

      resolve(imagePath);
    });
  });
}

export default function upload(req) {
  return new Promise((resolve, reject) => {
    const { id, type, image } = req.body;

    if (!image) {
      return reject('No image sent');
    }

    if (!req.user || typeof req.user === 'undefined') { // if no user at all
      return reject('No user');
    }

    if (type === 'person' && req.user._id !== id) {
      reject('You don\'t have permission to update this user');
    } else if (type === 'company') {
      if (req.user.role !== 'admin' && req.user.role !== 'owner') {
        reject('You don\'t have permission to update this company');
      } else {
        db.view('companies/byId', (companiesErr, companiesData) => {
          if (companiesErr) {
            reject(companiesErr);
          }

          const newCompaniesData = companiesData.map(companyData => companyData);
          const companyData = newCompaniesData.find(companyDataItem => companyDataItem.people.find(personData => personData === req.user._id));

          if (req.user.role === 'owner' && id !== companyData._id) {
            reject('You don\'t have permission to update this');
          }

          writeImage(image, id, reject, resolve);
        });
      }
    } else {
      writeImage(image, id, reject, resolve);
    }
  });
}
