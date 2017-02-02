# University of Portsmouth Reception App

[![Greenkeeper badge](https://badges.greenkeeper.io/zaccolley/reception.svg?token=4b6288a1f2d3894a7645f063a18a248fabffb1218fbd742cea00a146f2aee6fb)](https://greenkeeper.io/)

A reception app for the University of Portsmouth's shared offices

[![Build status](https://circleci.com/gh/zaccolley/reception.png?circle-token=0eb7cb5607a5c387ddf39eac62692a5b1c0e715a)](https://circleci.com/gh/zaccolley/reception)
[![Deployment status from DeployBot](https://rose.deploybot.com/badge/56046447921112/63915.svg)](http://deploybot.com)

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

```
npm run build
git add -f webpack-stats.json
git add -f static/dist/*
```

`pm2 start ecosystem.json`
