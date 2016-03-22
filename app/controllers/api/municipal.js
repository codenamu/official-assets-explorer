var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    db.Municipal.findAll({
      include: [{
        model: db.Province,
        where: {
          name: req.query.province
        }
      }]
    })
      .then(function(municipals) {
        res.json(municipals)
      })
  })

  return router
}
