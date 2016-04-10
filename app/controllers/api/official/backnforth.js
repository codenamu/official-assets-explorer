var express = require('express')
var db = require('../../../models')
var _ = require('underscore')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    var queries = req.query
    var where = {}
    var result = {}

    /**
     * make query parameters to array to use in `where` clause
     */
    if (queries.org && (typeof queries.org === 'string')) {
      queries.org = queries.org.split(',')
    }

    if (queries.year && (typeof queries.year === 'string')) {
      queries.year = queries.year.split(',').map(function(y) {
        return parseInt(y, 10)
      })
    } else if (queries.year) {
      queries.year = queries.year.map(function(y) {
        return parseInt(y, 10)
      })
    }

    if (queries.election) {
      console.log('=======')
      console.log('election')
      console.log('=======')
      /**
       * START
       * query parameters to search candidations in this election
       */
      if (queries.province) {
          where['$Dongs.Municipal.Province.name$'] = queries.province
      }
      if (queries.municipal) {
          where['$Dongs.Municipal.name$'] = queries.municipal
      }
      if (queries.dong) {
          where['$Dongs.name$'] = queries.dong
      }

      db.Constituency.findAll({
        where: where,
        include: [{
          model: db.Dong,
          include: [{
            model: db.Municipal,
            include: [{
              model: db.Province
            }]
          }]
        }]
      })
      .then(function(cons) {
        var targetConsIds = cons.map(function(r) {
          return r.id
        })

        if (queries.keyword) {
          keyword = '%' + queries.keyword.replace(/ /g, '%') + '%'

          where['$and'].push({
            $or: [{
              '$Person.name$': {
                $like: keyword
              }
            }, {
              '$Position.title$': {
                $like: keyword
              }
            }, {
              '$Position.Org3.title$': {
                $like: keyword
              }
            }]
          })
        }

        where = {
          $and: [{
            '$Person.election$': 1
          }, {
            '$Person.ConstituencyId$': {
              $in: targetConsIds
            }
          }]
        }

        getOfficials({
          order: [['year', 'DESC']],
          where: where,
          group: 'Person.uniqueId',
          include: [{
            model: db.Person
          }, {
            model: db.Position,
            include: [{
              model: db.Org3,
              include: [{
                model: db.Org2,
                include: [{
                  model: db.Org1
                }]
              }]
            }]
          }]
        })
        .then(function(officials) {
          var targetOfficialIds = officials.map(function(o) {
            return o.Person.dataValues.uniqueId
          })

          where['$and'].push({
            '$Person.uniqueId$': {
              $in: targetOfficialIds
            }
          })

          getOfficials({
            order: [['year', 'DESC']],
            where: where,
            include: [{
              model: db.Person,
              attributes: ['name', 'uniqueId']
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
            console.log(officials)
            officials = _.uniq(officials, function(o) {
              return o.Person.dataValues.uniqueId
            })

            var index = officials.findIndex(function(o) {
              return o.Person.dataValues.uniqueId === queries.uniqueId
            })

            if (index > 0 && index < officials.length - 1) {
              result.back = officials[index - 1]
              result.forth = officials[index + 1]
            } else if (index === 0) {
              result.forth = officials[index + 1]
            } else {
              result.back = officials[index - 1]
            }

            res.json(result)
          })
        })
      })

      /**
       * END
       * query parameters to search candidations in this election
       */
    } else {
      if (queries.keyword) {
        queries.keyword = '%' + queries.keyword.replace(/ /g, '%') + '%'

        where['$or'] = [{
          '$Person.name$': {
            $like: queries.keyword
          }
        }, {
          '$Position.title$': {
            $like: queries.keyword
          }
        }, {
          '$Position.Org3.title$': {
            $like: queries.keyword
          }
        }]
      }
      /**
       * START
       * query parameters to search officials with default options
       * SUCH AS Org, Year, Position, Name
       */


      if (queries.year) {
        where.year = { $in: queries.year }
      }

      if (queries.org) {
        where['$Position.Org3.Org2.Org1.title$'] = { $in: queries.org }
      }

      getOfficials({
        order: [['year', 'DESC']],
        where: where,
        group: 'Person.uniqueId',
        include: [{
          model: db.Person
        }, {
          model: db.Position,
          include: [{
            model: db.Org3,
            include: [{
              model: db.Org2,
              include: [{
                model: db.Org1
              }]
            }]
          }]
        }]
      })
      .then(function(officials) {
        var targets = officials.map(function(o) {
          return o.Person.dataValues.uniqueId
        })

        getOfficials({
          order: [['year', 'DESC']],
          include: [{
            model: db.Person,
            attributes: ['name', 'uniqueId'],
            where: { uniqueId: { $in: targets }}
          }, {
            model: db.Position,
            include: [{
              model: db.Org3,
              incude: [{
                model: db.Org2,
                include: [{
                  model: db.Org1
                }]
              }]
            }]
          }]
        })
        .then(function(officials) {
          officials = _.uniq(officials, function(o) {
            return o.Person.dataValues.uniqueId
          })

          var index = officials.findIndex(function(o) {
            return o.Person.dataValues.uniqueId === queries.uniqueId
          })

          if (index > 0 && index < officials.length - 1) {
            result.back = officials[index - 1]
            result.forth = officials[index + 1]
          } else if (index === 0) {
            result.forth = officials[index + 1]
          } else {
            result.back = officials[index - 1]
          }

          res.json(result)
        })


      })
      /**
       * END
       * query parameters to search officials with default options
       * SUCH AS Org, Year, Position, Name
       */
    }
  })

  return router
}

function getOfficials(searchOption) {
  return db.Official.findAll(searchOption)
}
