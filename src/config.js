require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  apiPort: process.env.APIPORT,
  app: {
    title: 'Innovation Space Reception App',
    description: 'A reception app for the Innovation Space',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Innovation Space Reception App',
        'og:image': '',
        'og:locale': 'en_US',
        'og:title': 'Innovation Space Reception App',
        'og:description': 'A reception app for the Innovation Space',
        'twitter:card': 'summary',
        'twitter:site': '@innovatepompey',
        'twitter:creator': '@innovatepompey',
        'twitter:title': 'Innovation Space Reception App',
        'twitter:description': 'A reception app for the Innovation Space',
        'twitter:image': '',
        'twitter:image:width': '200',
        'twitter:image:height': '200'
      }
    }
  }
}, environment);
