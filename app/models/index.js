var fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  config = require('../../config/config'),
  db = {}

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host ? config.db.host : 'localhost',
  port: config.db.port ? config.db.port : 3306,
  logging: process.env.NODE_ENV == 'production' ? false : true
})

fs.readdirSync(__dirname).filter(function (file) {
  return (file.indexOf('.') !== 0) && (file !== 'index.js')
}).forEach(function (file) {
  var model = sequelize['import'](path.join(__dirname, file))
  db[model.name] = model
})

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
