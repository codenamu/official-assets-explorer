var express = require('express')
var db = require('../../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    var uniqueId = req.params.uniqueId
    console.log(uniqueId)
    console.lot(this.uniqueId)

    

  return router
}
