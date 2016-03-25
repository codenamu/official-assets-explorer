var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    var queries = req.query

    if (queries.org && (typeof queries.org === 'string')) {
      queries.org = queries.org.split(',')
    }

    if (queries.year && (typeof queries.year === 'string')) {
      queries.year = queries.year.split(',')
    }

    // TODO: integration query paramters
    var org = queries.org ? { title: { $in: queries.org }} : {}
    var year = queries.year ? { year: { $in: queries.year }} : {}
    var keywordQuery = queries.keyword ? {
        $or: [{
            '$Person.name$': {
              $like: '%' + queries.keyword.replace(/ /g, '%') + '%'
            }
          }, {
            '$Position.title$': {
              $like: '%' + queries.keyword.replace(/ /g, '%') + '%'
            }
          }, {
            '$Position.Org3.title$': {
              $like: '%' + queries.keyword.replace(/ /g, '%') + '%'
            }
          }]
      } : {}

    db.Official.findAll({
      where: keywordQuery,
      include: [{
        model: db.Person,
        attributes: ['uniqueId', 'name']
      }, {
        model: db.Position,
        attributes: ['id'],
        include: [{
          model: db.Org3,
          attribute: ['id'],
          incude: [{
            model: db.Org2,
            attribute: ['id'],
            include: [{
              model: db.Org1,
              attribute: ['id'],
              where: org
            }]
          }]
        }]
      }]
    })
    .then(function (officials) {
      var targets = officials.map(function(o) {
        return o.Person.dataValues.uniqueId
      })

      db.Official.findAll({
        order: [
          ['year', 'ASC']
        ],
        include: [{
          model: db.Person,
          attributes: ['name', 'uniqueId'],
          where: { uniqueId: { $in: targets }}
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
        }]
      })
      .then(function(officials) {
        res.json(officials)
      })
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
