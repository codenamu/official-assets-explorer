var express = require('express')
var db = require('../../../models')
var config = require('../../../../config/config')
var redis = require("redis")

module.exports = function() {
  var router = express.Router()
  var client = redis.createClient()

  client.on("error", function (err) {
      console.log("Error " + err);
  });

  router.get('/', function(req, res, next) {
    var queries = req.query
    var result = {}
    var searchOption = {}
    var params = {}
    var where = {}

    getRedis(req.query, function(err, values) {
      if (values) {
        res.json(values)
      } else {
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

        /**
         * replace whitespace to `%` to use in `in` query in `where` clause
         */

        if (queries.keyword) {
          queries.keyword = '%' + queries.keyword.replace(/ /g, '%') + '%'
        }

        if (queries.election) {
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

            where = {}
            where['$and'] = []
            where['$Person.election$'] = 1

            // 비례대표가 constituency 테이블에 포함되지 않아 포함시켜야함
            if (targetConsIds.length && (queries.province || queries.municipal || queries.dong)) {
              where['$Person.ConstituencyId$'] = {
                $in: targetConsIds
              }
            }


            if (queries.keyword) {
              var keyword = queries.keyword.replace('/ /g', '%')

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

            getCount(db.Official, {
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
            .then(function(count) {
              result.count = count.length

              getOfficials({
                order: [['year', 'DESC']],
                where: where,
                group: 'Person.uniqueId',
                limit: queries.limit ? parseInt(queries.limit, 10) : 40,
                offset: queries.offset ? parseInt(queries.offset, 10) : 0,
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
                  result.officials = officials
                  setRedis(req.query, result)
                  res.json(result)
                })
              })
            })
          })

          /**
           * END
           * query parameters to search candidations in this election
           */
        } else {
          /**
           * START
           * query parameters to search officials with default options
           * SUCH AS Org, Year, Position, Name
           */

          if (queries.keyword) {
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

          if (queries.year) {
            where.year = { $in: queries.year }
          }

          if (queries.org) {
            where['$Position.Org3.Org2.Org1.title$'] = { $in: queries.org }
          }

          getCount(db.Official, {
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
          .then(function(count) {
            result.count = count.length

            getOfficials({
              order: [['year', 'DESC']],
              where: where,
              group: 'Person.uniqueId',
              limit: queries.limit ? parseInt(queries.limit, 10) : 40,
              offset: queries.offset ? parseInt(queries.offset, 10) : 0,
              include: [{
                model: db.Person
              }, {
                model: db.Position,
                attributes: ['title'],
                include: [{
                  model: db.Org3,
                  attributes: ['title'],
                  include: [{
                    model: db.Org2,
                    attributes: ['title'],
                    include: [{
                      model: db.Org1,
                      attributes: ['title']
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
                setRedis(req.query, result)
                res.json(result)
              })

            })
          })
          /**
           * END
           * query parameters to search officials with default options
           * SUCH AS Org, Year, Position, Name
           */
        }
      }
    })



    function getRedis(query, callback) {
      var cb = typeof callback == 'function' ? callback : function(){}

      client.get(JSON.stringify(query), function(err, result) {
          cb(err, JSON.parse(result))
      })
    }

    function setRedis(query, data) {
      return client.set(JSON.stringify(query), JSON.stringify(data), 'NX', 'EX', config.redis.expired)
    }
  })

  return router
}

function getCount(target, option) {
  return target.count(option)
}

function getOfficials(searchOption) {
  return db.Official.findAll(searchOption)
}
