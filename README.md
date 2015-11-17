# University of Portsmouth Reception App

A reception app for the University of Portsmouth's shared offices

---

## About

This is based on the [react-redux-universal-hot-example boiler plate](https://github.com/erikras/react-redux-universal-hot-example). You can read the basic set-up there.

One of the things that differ is this project is using a standard set-up for the stylesheets rather than the inline styling.

## Installation

Requires a CouchDB server to be set-up with the default settings and a admin user created.

Redis is being used for the sessions.

There is a `env.json` config file that must be created and filled in. This includes Mandrill, Twilio and CouchDB admin details. You'll find a `env-sample.json` to get started.

The styles are using Sass so this should be installed too.

1. Install CouchDB
2. Install Redis
2. Configure `env.json` file
3. Install Sass: `gem install sass`
4. Install Node dependencies: `npm install`

## Running Dev Server

```
npm run dev
```

## Building and Running Production Server

```
npm run build
npm run start
```

## Deployment

On the server we'll use PM2. Install that then run: `pm2 start "/usr/local/bin/npm" --name "RECEPTION" -- start`
