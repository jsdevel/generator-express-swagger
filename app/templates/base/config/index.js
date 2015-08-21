var config;

switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    config = require('./prod.json');
    break;
  case 'qa':
    config = require('./qa.json');
    break;
  default:
    config = require('./dev.json');
}

module.exports = config;
