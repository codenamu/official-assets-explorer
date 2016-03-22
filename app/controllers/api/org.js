var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    db.Org1.findAll()
      .then(function(orgs) {
        res.json(orgs)
      })
  })

  return router
}
