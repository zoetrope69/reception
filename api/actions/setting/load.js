const initialSettings = [
  {
    id: 1,
    visibility: true,
    type: 'Staff',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    phone: '3801208321'
  }
];

export function getSettings(req) {
  let settings = req.session.settings;
  if (!settings) {
    settings = initialSettings;
    req.session.settings = settings;
  }
  return settings;
}

export default function load(req) {
  return new Promise((resolve) => {
    // make async call to database

    // reject();

    resolve(getSettings(req));
  });
}
