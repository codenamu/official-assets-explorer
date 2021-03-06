var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.post('/', function(req, res, next) {
    var queries = req.body

    db.Survey.create(queries)
      .then(function(result) {
        res.json(result)
      })
      .catch(function(err) {
        res.status(500).send(err)
      })
  })

  return router
}
