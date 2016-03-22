var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    db.Province.findAll()
      .then(function(provinces) {
        res.json(provinces)
      })
  })

  return router
}
