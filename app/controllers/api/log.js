var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.post('/', function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var userAgent = req.headers['user-agent']

    db.Log.create({
      browserInfo: userAgent,
      ip: ip,
      data: req.body.dataId
    }).then(function(result) {
      res.json({message: 'success'})
    }).error(function(err) {
      res.status(500).send(err)
    })
  })

  return router
}
