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
  }, (err, responses) => {
    const response = responses[0];

    if (err) {
      return callback(JSON.stringify(err), null);
    }

    if (response.status === 'rejected') {
      return callback(response.reject_reason, null);
    }

    return callback(null, response);
  });
}
