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

export default function upload(req) {
  return new Promise((resolve, reject) => {

    const { user, image } = req.body;

    if (!image) {
      return reject('No image sent');
    }

    if (!req.user || typeof req.user === 'undefined') { // if no user at all
      return reject('No user');
    }

    if (req.user._id === user) {

      const imageBuffer = decodeBase64Image(image);
      console.log('imageBuffer', imageBuffer);

      const date = +new Date();
      const imagePath = `/images/${user}_${date}.jpg`;

      fs.writeFile('static' + imagePath, imageBuffer.data, (err) => {
        if (err) {
          return reject('Something went wrong uploading the image...');
        }

        db.merge(user, { image: imagePath }, (dbErr) => {
          if (dbErr) {
            reject(dbErr);
          }

          resolve(imagePath);
        });

      });

    } else {
      reject('You don\'t have permission to update this user');
    }

  });
}
