const mandrill = require('node-mandrill')(process.env.MANDRILL_API);

const sendEmail = (subject, message, email, name, callback) => {
  mandrill('/messages/send', {
    message: {
      to: [{ email: email, name: name }],
      from_email: 'reception@innovationspace.org.uk',
      subject: subject,
      text: message
    }
  }, (error, processedMessage) => {

    if (error) {
      callback(JSON.stringify(error), null);
    } else {
      callback(null, processedMessage);
    }

  });
};

module.exports = sendEmail;
