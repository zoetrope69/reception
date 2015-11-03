import cradle from 'cradle';

const dbOptions = {
  cache: true,
  retries: 3,
  retryTimeout: 30 * 1000
};

// if theres a username and password for the server add this to the database options
if (typeof process.env.DB_USERNAME !== 'undefined' &&
    typeof process.env.DB_PASSWORD !== 'undefined') {

  dbOptions.auth = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  };
}

module.exports = new(cradle.Connection)(dbOptions).database('reception');
