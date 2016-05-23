import config from '../../src/config';
import twilio from 'twilio';

const clientName = 'reception';

export default function generateToken() {
  return new Promise((resolve) => {
    const capability = new twilio.Capability(config.env.twilio.id,
                                             config.env.twilio.token);

    capability.allowClientIncoming(clientName);
    capability.allowClientOutgoing(config.env.twilio.app);

    resolve(capability.generate());
  });
}
