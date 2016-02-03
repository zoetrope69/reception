import config from '../src/config';

import buildings from 'migrations/buildings';
import events from 'migrations/events';
import companies from 'migrations/companies';
import people from 'migrations/people';

import cradle from 'cradle';

const dbOptions = {
  cache: true,
  retries: 3,
  retryTimeout: 30 * 1000
};

// if theres a username and password for the server add this to the database options
if (typeof config.env.db.admin.username !== 'undefined' &&
    typeof config.env.db.admin.password !== 'undefined') {
  dbOptions.auth = {
    username: config.env.db.admin.username,
    password: config.env.db.admin.password
  };
}

const db = new(cradle.Connection)(dbOptions).database('reception');

db.exists((err, exists) => {
  if (err) {
    console.log('==> 📦  Database error', err);
  } else if (exists) {
    console.log('==> 📦  Database: http://localhost:5984/_utils', '');

    /* destroy the database while testing
    console.log('   ... Destroying database');
    db.destroy();
    */
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
          if (!doc.deleted && doc.resource === 'building' && doc.name) {
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

      byId: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'company' && doc.name) {
            emit(doc._id, doc);
          }
        }`
      }

    });

    db.save(people, (peopleErr, res) => {
      if (peopleErr) {
        console.log('   ... Error saving people: ', peopleErr);
      }

      if (res) {
        console.log('   ... Saved people');
      }
    });

    db.save('_design/people', {

      byId: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'person') {
            emit(doc._id, doc);
          }
        }`
      },

      byEmail: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'person') {
            emit(doc.email, doc);
          }
        }`
      },

      byToken: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'person' && doc.token) {
            emit(doc.token, doc);
          }
        }`
      },

      byCompany: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'company' && doc.people) {
            emit(doc._id, doc);
            for (var i in doc.people) {
              var person = doc.people[i];
              emit([doc._id, i], { _id: person });
            }
          }
        }`
      },

      isDeleted: {
        map: `function(doc) {
          if (doc.deleted && doc.resource === 'person') {
            emit(doc._id, doc);
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

      byId: {
        map: `function(doc) {
          if (!doc.deleted && doc.resource === 'event' && doc.time) {
            emit(doc._id, doc);
          }
        }`
      }

    });
  }
});

module.exports = db;
