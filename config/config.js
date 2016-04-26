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
    host: 'http://jaesan.newstapa.org',
    ga: 'UA-61309870-1',
    root: rootPath,
    force: false,
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
    },
    redis: {
      expired: 3600 * 3 // cache expired after 3 hours
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
    host: 'http://jaesan.newstapa.org',
    ga: 'UA-61309870-1',
    root: rootPath,
    force: false,
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
    host: 'http://jaesan.newstapa.org',
    ga: 'UA-61309870-1',
    root: rootPath,
    force: false,
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
