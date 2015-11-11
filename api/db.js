import buildings from 'migrations/buildings';
import events from 'migrations/events';
import companies from 'migrations/companies';

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

const db = new(cradle.Connection)(dbOptions).database('reception');

db.exists((err, exists) => {

  if (err) {

    console.log('==> 📦  Database error', err);

  } else if (exists) {

    console.log('==> 📦  Database: http://localhost:5984/_utils');

    // destroy the database while testing
    // console.log('   ... Destroying database');
    // db.destroy();

  } else {


    console.log('==> 📦  Database does not exist...' );
    console.log('   ... Creating database: http://localhost:5984/_utils');

    db.create();

    db.save(buildings, (buildingsErr, res) => {

      if (buildingsErr) {
        console.log('   ... Error saving buildings: ', buildingsErr);
      }

      if (res) {
        console.log('   ... Saved buildings');
      }

    });

    db.save('_design/buildings', {

      byId: {
        map: `function(doc) {
          if (doc.resource === 'buildings' && doc.name) {
            emit(doc._id, doc);
          }
        }`
      }

    });

    db.save(companies, (companiesErr, res) => {

      if (companiesErr) {
        console.log('   ... Error saving companies: ', companiesErr);
      }

      if (res) {
        console.log('   ... Saved companies');
      }

    });

    db.save('_design/companies', {

      all: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'company' && doc.name) {
            emit(doc._id, doc);
          }
        }`
      }

    });

    db.save('_design/people', {

      all: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'company' && doc.name && doc.people) {
            for (var count = 0; count < doc.people.length; count++) {
              var person = doc.people[count];
              emit(doc._id + '_' + count, person);
            }
          }
        }`
      },

      byEmail: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'company' && doc.name && doc.people) {
            for (var count = 0; count < doc.people.length; count++) {
              var person = doc.people[count];
              emit(person.email[0].address, person);
            }
          }
        }`
      },

      byToken: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'company' && doc.name && doc.people) {
            for (var count = 0; count < doc.people.length; count++) {
              var person = doc.people[count];
              if (!person.deleted && person.token) {
                emit(person.token, person);
              }
            }
          }
        }`
      },

      isDeleted: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'company' && doc.name && doc.people) {
            for (var count = 0; count < doc.people.length; count++) {
              var person = doc.people[count];
              emit(person.email[0].address, person);
            }
          }
        }`
      }

    });

    db.save(events, (eventsErr, res) => {

      if (eventsErr) {
        console.log('   ... Error saving events: ', eventsErr);
      }

      if (res) {
        console.log('   ... Saved events');
      }

    });

    db.save('_design/events', {

      all: {
        map: `function(doc) {
          if (doc.resource === 'events' && doc.time) {
            emit(doc._id, doc);
          }
        }`
      }

    });

  }

});

module.exports = db;
