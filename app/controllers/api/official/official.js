var express = require('express')
var db = require('../../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/:uniqueId', function (req, res, next) {
    var uniqueId = req.params.uniqueId

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
      res.json(officials)
    })
  })

  return router
}
