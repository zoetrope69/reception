require('../server.babel'); // babel registration (runtime transpilation for node)

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from './db';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(session({
  secret: 'ireallywanttobeainnospaceman',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());

// -- error handling

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    return Promise.reject(err.message);
  }
  return next(err);
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  return Promise.reject(err.message);
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const comparePassword = (password, userPassword, callback) => {
  bcrypt.compare(password, userPassword, (err, isPasswordMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isPasswordMatch);
  });
};

function findById(id, callback) {

  db.view('people/all', { key: id }, (err, data) => {

    if (err) {
      return callback(err);
    }

    if (data.length > 0) {
      const user = data[0].value;

      return callback(null, user);
    }

    return callback(null, false);

  });

}

function findByEmail(email, callback) {

  db.view('people/byEmail', { key: email }, (err, data) => {

    if (err) {
      return callback(err);
    }

    if (data.length > 0) {
      const user = data[0].value;

      return callback(null, user);
    }

    return callback(null, false);

  });

}

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy((username, password, done) => {
  // asynchronous verification, for effect...
  process.nextTick(() => {

  // find the user by username
    findByEmail(username, (err, user) => {

      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: `Sorry! Couldn't find any user with that email (${username}).` });
      }

      comparePassword(password, user.password, (passwordErr, isPasswordMatch) => {

        if (passwordErr) {
          return done(passwordErr);
        }

        if (!isPasswordMatch) {
          return done(null, false, { message: `Sorry! That password isn't right.` });
        }

        return done(null, user);

      });

    });

  });
}));

// initialize passport
app.use(passport.initialize());
// use passport.session() middleware, to support persistent login sessions
app.use(passport.session());

app.use((req, res) => {

  const matcher = req.url.split('?')[0].split('/').slice(1);

  let action = false;
  let params = null;
  let apiActions = actions;
  let sliceIndex = 0;

  for (const actionName of matcher) {

    if (apiActions[actionName]) {
      action = apiActions[actionName];
    }

    if (typeof action === 'function') {
      params = matcher.slice(++sliceIndex);
      break;
    }
    apiActions = action;
    ++sliceIndex;
  }

  if (action && typeof action === 'function') {
    action(req, params)
      .then((result) => {
        res.json(result);
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port ' + config.apiPort);
    console.info('==> 💻  Send requests to http://localhost:' + config.apiPort);
  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);

} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
