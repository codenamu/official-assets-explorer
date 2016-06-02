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
    ga_2: 'UA-45524133-1',
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
      username: process.env.mysqlUsername || 'root',
      password: process.env.mysqlPassword || ''
    },
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || '127.0.0.1',
      expired: 3600 * 3 // cache expired after 3 hours
    },
    sendgrid: {
      apikey: process.env.SENDGRID || ''
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
      username: process.env.mysqlUsername || 'root',
      password: process.env.mysqlPassword || ''
    },
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || '127.0.0.1',
      expired: 3600 * 3 // cache expired after 3 hours
    },
    sendgrid: {
      apikey: process.env.SENDGRID || ''
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
      username: process.env.mysqlUsername || 'root',
      password: process.env.mysqlPassword || ''
    },
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || '127.0.0.1',
      expired: 3600 * 3 // cache expired after 3 hours
    },
    sendgrid: {
      apikey: process.env.SENDGRID || ''
    }
  }
};

module.exports = config[env];
