import config from '../src/config';
import twilio from 'twilio';

const client = new twilio.RestClient(config.env.twilio.id,
                                     config.env.twilio.token);

export default function sendSMS(text, number, callback) {

  client.messages.create({

    to: number,
    from: config.env.twilio.number,
    body: text

  }, (error, message) => {

    if (error) {
      callback(error.message, null);
    } else {
      callback(null, message);
    }

  });

}
