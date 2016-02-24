var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'publicwealth'
    },
    port: 3000,
    db: 'mysql://root:@localhost:3306/publicwealth',
    sync: true
  },

  test: {
    root: rootPath,
    app: {
      name: 'publicwealth'
    },
    port: 3000,
    db: 'mysql://localhost/publicwealth-test',
    sync: false
  },

  production: {
    root: rootPath,
    app: {
      name: 'publicwealth'
    },
    port: 3000,
    db: 'mysql://localhost/publicwealth-production',
    sync: false
  }
};

module.exports = config[env];
