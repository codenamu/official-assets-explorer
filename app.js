var express = require('express'),
  config = require('./config/config'),
  env = process.env.NODE_ENV || 'development',
  db = require('./app/models')

var app = express()

require('./config/express')(app, config)

db.sequelize
  .sync()
  .then(function () {
    app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port)
    })
  }).catch(function (e) {
    throw new Error(e)
  })
