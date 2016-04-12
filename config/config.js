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
    db: 'mysql://root:@localhost:3306/publicassets'
  },

  test: {
    root: rootPath,
    app: {
      name: 'publicassets'
    },
    port: 3000,
    db: 'mysql://' + process.env.mysqlUsername + ':' + process.env.mysqlPassword + '@localhost:3306/publicassets-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'publicassets'
    },
    port: 3000,
    db: 'mysql://' + process.env.mysqlUsername + ':' + process.env.mysqlPassword + '@localhost:3306/publicassets-production'
  }
};

module.exports = config[env];
