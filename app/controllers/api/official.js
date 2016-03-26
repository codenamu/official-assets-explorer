var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    var result = {}
    var queries = req.query
    var searchOption = {}

    console.log()

    searchOption.order = [['year', 'DESC']]
    searchOption.where = queries.keyword ? {
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

    if (queries.org && (typeof queries.org === 'string')) {
      queries.org = queries.org.split(',')
      searchOption.where['$Position.Org3.Org2.Org1.title$'] = { $in: queries.org }
    }
    if (queries.year && (typeof queries.year === 'string')) {
      queries.year = queries.year.split(',')
      searchOption.where['year'] = { $in: queries.year }
    }
    
    searchOption.include = [{
        model: db.Person,
        attributes: ['uniqueId'],
        required: true
      }, {
        model: db.Position,
        attributes: ['id'],
        required: true,
        include: [{
          model: db.Org3,
          attribute: ['id'],
          required: true,
          incude: [{
            model: db.Org2,
            attribute: ['id'],
            required: true,
            include: [{
              model: db.Org1,
              attribute: ['id'],
              required: true
            }]
          }]
        }]
      }]

    searchOption.group = ['Person.uniqueId']
    searchOption.limit = queries.limit ? queries.limit : 40
    searchOption.offset = queries.offset ? parseInt(queries.offset, 10) : 0
    

    db.Official.findAndCount(searchOption)
    .then(function (officials) {
      result.count = officials.count.length

      var targets = officials.rows.map(function(o) {
        return o.Person.dataValues.uniqueId
      })
      
      db.Official.findAll({
        order: [['year', 'ASC']],
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
        result.officials = officials
        res.json(result)
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
