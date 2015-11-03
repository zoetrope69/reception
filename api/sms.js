import twilio from 'twilio';

const client = new twilio.RestClient(process.env.TWILIO_ID,
                                     process.env.TWILIO_TOKEN);

const sendSMS = (text, number, callback) => {

  client.messages.create({

    to: number,
    from: process.env.TWILIO_NUMBER,
    body: text

  }, (error, message) => {

    if (error) {
      callback(error.message, null);
    } else {
      callback(null, message);
    }

  });

};

module.exports = sendSMS;
