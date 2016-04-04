var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'publicassets'
    },
    port: 3000,
    db: 'mysql://root:@localhost:3306/publicassets_new',
    sync: true
  },

  test: {
    root: rootPath,
    app: {
      name: 'publicassets'
    },
    port: 3000,
    db: 'mysql://localhost/publicassets-test',
    sync: false
  },

  production: {
    root: rootPath,
    app: {
      name: 'publicassets'
    },
    port: 3000,
    db: 'mysql://localhost/publicassets-production',
    sync: false
  }
};

module.exports = config[env];
