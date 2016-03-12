var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    db.Official.findAll({
      include: [{
        model: db.Person,
        attributes: ['uniqueId', 'name']
      }, {
        model: db.Position,
        attributes: ['title'],
        include: [{
          model: db.Org,
          attributes: ['title']
        }]
      }]
    })
    .then(function (officials) {
      res.json(officials)
    })
  })

  router.get('/search', function(req, res) {
    var queries = req.query
    var org = queries.org ? { title: { $in: queries.org.split(',') }} : {}
    var year = queries.year ? { year: { $in: queries.year.split(',') }} : {}
    var name = queries.name ? { name: { $like: queries.name }} : {}
    
    db.Official.findAll({
      order: [
        ['year', 'ASC']
      ],
      where: year,
      include: [{
        model: db.Person,
        attributes: ['name'],
        where: name
      }, {
        model: db.Position,
        attributes: ['title'],
        include: [{
          model: db.Org,
          where: org,
          attributes: ['title']
        }]
      }]
    })
    .then(function (officials) {
      res.json(officials)
    })
  })

  router.get('/:uniqueId', function (req, res, next) {
    var uniqueId = req.params.uniqueId
    
    db.Official.findAll({
      order: [
        ['year', 'ASC']
      ],
      include: [{
        model: db.Person,
        attributes: ['name'],
        where: { uniqueId: uniqueId }
      }, {
        model: db.Position,
        attributes: ['title'],
        include: [{
          model: db.Org,
          attributes: ['title']
        }]
      }, {
        model: db.Asset,
        include: [{
          model: db.Cat_2,
          include: [{
            model: db.Cat_1
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
