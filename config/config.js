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
    db: {
      host: '',
      port: 3306,
      database: 'publicassets',
      username: 'root',
      password: ''
    }
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
    db: {
      host: '',
      port: 3306,
      database: 'publicassets-test',
      username: process.env.mysqlUsername,
      password: process.env.mysqlPassword
    }
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
    db: {
      host: '',
      port: 3306,
      database: 'publicassets',
      username: process.env.mysqlUsername,
      password: process.env.mysqlPassword
    }
  }
};

module.exports = config[env];
