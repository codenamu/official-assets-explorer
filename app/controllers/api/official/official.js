var express = require('express')
var db = require('../../../models')
var config = require('../../../../config/config')
var redis = require("redis")

module.exports = function() {
  var router = express.Router()
  var client = redis.createClient()

  router.get('/:uniqueId', function (req, res, next) {
    var uniqueId = req.params.uniqueId

    getRedis(uniqueId, function(err, value) {
      if (value) {
        res.json(value)
      } else {
        db.Official.findAll({
          order: [
            ['year', 'ASC']
          ],
          include: [{
            model: db.Person,
            attributes: ['uniqueId', 'name'],
            where: { uniqueId: uniqueId }
          }, {
            model: db.Position,
            attributes: ['title'],
            include: [{
              model: db.Org3,
              attribute: ['title'],
              incude: [{
                model: db.Org2,
                attribute: ['title'],
                include: [{
                  model: db.Org1,
                  attribute: ['title']
                }]
              }]
            }]
          }, {
            model: db.Asset,
            include: [{
              model: db.Cat2,
              include: [{
                model: db.Cat1
              }]
            }]
          }]
        })
        .then(function (officials) {
          setRedis(uniqueId, officials)
          res.json(officials)
        })
      }
    })

  })

  function getRedis(uniqueId, callback) {
    var cb = typeof callback == 'function' ? callback : function(){}

    client.get(uniqueId, function(err, result) {
        cb(err, JSON.parse(result))
    })
  }

  function setRedis(uniqueId, data) {
    return client.set(uniqueId JSON.stringify(data), 'NX', 'EX', config.redis.expired)
  }

  return router
}
