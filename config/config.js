var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    smtp: {
      host: '',
      port: 0,
      user: '',
      password: '',
      tlsOrSsl: false
    },
    host: 'http://newstapa.org',
    ga: 'XXX',
    root: rootPath,
    app: {
      name: 'publicassets'
    },
    port: 3000,
    db: 'mysql://root:@localhost:3306/publicassets'
  },

  test: {
    smtp: {
      host: '',
      port: 0,
      user: '',
      password: '',
      tlsOrSsl: false
    },
    host: 'http://newstapa.org',
    ga: 'XXX',
    root: rootPath,
    app: {
      name: 'publicassets'
    },
    port: 3000,
    db: 'mysql://' + process.env.mysqlUsername + ':' + process.env.mysqlPassword + '@localhost:3306/process.env.officialDbName'
  },

  production: {
    smtp: {
      host: '',
      port: 0,
      user: '',
      password: '',
      tlsOrSsl: false
    },
    host: 'http://newstapa.org',
    ga: 'XXX',
    root: rootPath,
    app: {
      name: 'publicassets'
    },
    port: 3000,
    db: 'mysql://' + process.env.mysqlUsername + ':' + process.env.mysqlPassword + '@localhost:3306/publicassets-production'
  }
};

module.exports = config[env];
