import config from '../src/config';
const mandrill = require('node-mandrill')(config.env.mandrill.key);

export default function sendEmail(subject, text, email, name, callback) {

  mandrill('/messages/send', {
    message: {
      to: [{ email, name }],
      from_email: 'reception@innovationspace.org.uk',
      from_name: 'Innovation Space Reception',
      subject,
      text
    }
  }, (err, response) => {

    if (err) {
      callback(JSON.stringify(err), null);
    }

    callback(null, response);

  });

}
