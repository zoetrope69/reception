import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import {mapUrl} from 'utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import db from './db';
import twilio from 'twilio';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

const RedisStore = require('connect-redis')(session);

const timeToExpire = 3600000; // an hour
const sess = {
  store: new RedisStore({
    host: '127.0.0.1',
    port: 6379
  }),
  secret: 'ireallywanttobeainnospaceman',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + timeToExpire),
    maxAge: timeToExpire
  }
};

// enable https on the production server
if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
// handle lost connections with redis
app.use((req, res, next) => {
  if (!req.session) {
    return next(new Error('oh no')); // handle error
  }
  next(); // otherwise continue
});

app.use(bodyParser.json({ limit: '50mb' }));

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
  db.view('people/byId', { key: id }, (err, data) => {
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
  // find the user by username
  findByEmail(username, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: `Sorry! Couldn't find any user with that email (${username}).` });
    }

    // check to see if they've only been invited
    if (!user.password && user.invited) {
      return done(null, false, { message: `Oops! You need to signup via your email ${username}` });
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
}));

// initialize passport
app.use(passport.initialize());
// use passport.session() middleware, to support persistent login sessions
app.use(passport.session());

// handle /voice for twilio requests
app.post('/voice', (req, res) => {
  if (!twilio.validateExpressRequest(req, config.env.twilio.token)) {
    return res.status(403).send('You are not Twilio.');
  }

  const number = req.body.number;

  const response = new twilio.TwimlResponse()
    .dial({ callerId: config.env.twilio.id }, (node) => {
      // check if a real number
      if (/^[\d\+\-\(\) ]+$/.test(number)) {
        node.number(number);
      } else {
        node.client(number);
      }
    });

  res.header('Content-Type', 'text/xml');
  res.send(response.toString()); // send back the TwiML
});

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);

  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
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
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
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
