require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const configOptions = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Innovation Space Reception App',
    description: 'A reception app for the Innovation Space',
    head: {
      titleTemplate: 'React Redux Example: %s',
      meta: [
        {name: 'description', content: 'A reception app for the Innovation Space'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Innovation Space Reception App'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_GB'},
        {property: 'og:title', content: 'Innovation Space Reception App'},
        {property: 'og:description', content: 'A reception app for the Innovation Space'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@innovatepompey'},
        {property: 'og:creator', content: '@innovatepompey'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  }
};

configOptions.env = require('../env');

module.exports = Object.assign(configOptions, environment);
