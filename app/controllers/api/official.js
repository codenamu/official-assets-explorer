var express = require('express')
var db = require('../../models')

module.exports = function() {
  var router = express.Router()

  router.get('/', function(req, res, next) {
    var queries = req.query
    var result = {}
    var searchOption = {}
    var params = {}
    var where = {}

    // ready for clean query parameters
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

    if (queries.keyword) {
      queries.keyword = '%' + queries.keyword.replace(/ /g, '%') + '%'
    }


      console.log('here')
    if (queries.election) {
      // where['$Person.election$'] = queries.election ? 1 : 0

      // searchOption.include[0].include = [{
      //   model: db.Constituency,
      //   attribute: [['id', 'ConstituencyId'], 'name'],
      //   required: true
      // }]
      // 
      // 
      if (queries.dong) {
        where['$Dongs.name$'] = queries.dong
      } else if (queries.municipal) {
        where['$Dongs.Municipal.name$'] = queries.municipal
      } else if (queries.province) {
        where['$Dongs.Municipal.Province.name$'] = queries.province
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

        where = {
          $and: [{
            '$Person.election$': 1
          }, {
            '$Person.ConstituencyId$': {
              $in: targetConsIds
            }
          }]
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
              res.json(result)
            })
          })
        })
      })
    } else {
      

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
    }
    

    // 
    // searchOption.where = queries.keyword ? {
    //     $or: [{
    //         '$Person.name$': {
    //           $like: '%' + queries.keyword.replace(/ /g, '%') + '%'
    //         }
    //       }, {
    //         '$Position.title$': {
    //           $like: '%' + queries.keyword.replace(/ /g, '%') + '%'
    //         }
    //       }, {
    //         '$Position.Org3.title$': {
    //           $like: '%' + queries.keyword.replace(/ /g, '%') + '%'
    //         }
    //       }]
    //   } : {}

    
    // }

    // searchOption.where['$Position.Org3.Org2.Org1.title$'] = { $in: queries.org }
    // searchOption.where['year'] = { $in: queries.year }
    
    // searchOption.include = [{
    //     model: db.Person,
    //     attributes: ['id', 'uniqueId'],
    //     required: true
    //   }, {
    //     model: db.Position,
    //     attributes: ['id'],
    //     required: true,
    //     include: [{
    //       model: db.Org3,
    //       attribute: ['id'],
    //       required: true,
    //       incude: [{
    //         model: db.Org2,
    //         attribute: ['id'],
    //         required: true,
    //         include: [{
    //           model: db.Org1,
    //           attribute: ['id', 'title'],
    //           required: true
    //         }]
    //       }]
    //     }]
    //   }]


    // searchOption.group = ['Person.uniqueId']

    // if (queries.election) {
    //   searchOption.where['$Person.election$'] = queries.election ? 1 : 0
    //   searchOption.include[0].include = [{
    //     model: db.Constituency,
    //     attribute: [['id', 'ConstituencyId'], 'name'],
    //     required: true
    //   }]

    //   db.Constituency.findAll({
    //     include: [{
    //       model: db.Dong,
    //       where: {
    //         name: queries.dong ? queries.dong : ''
    //       }
    //     }]
    //   })
    //   .then(function(result) {
    //     searchOption.where['$Person.Constituency.id$'] = result[0].id
        
    //     getOfficials(searchOption, res)
    //   })
    //   // searchOption.where['$Person.Constituency.Dongs.name$'] = queries.dong
    // } else {
      
    //   // getOfficials(searchOption, res)
    //   db.Official.count({
    //     where: {
    //       year: {
    //         $in: ['2014', '2015']
    //       },
    //       '$Position.title$': {
    //         $like: '%대통령%'
    //       }
    //     },
    //     group: 'Person.uniqueId',
    //     attributes: ['Official.*', 'Person.*'],
    //     include: [{
    //       model: db.Person,
    //       attribute: ['uniqueId']
    //     }, {
    //       model: db.Position
    //     }]
    //   })
    //   .then(function(result) {
    //     res.json(result)
    //   })
    // }


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

function getCount(target, option) {
  return target.count(option)
}

function getOfficials(searchOption) {
  return db.Official.findAll(searchOption)
  // var result = {}
  // searchOption.limit = queries.limit ? parseInt(queries.limit, 10) : 40
  // // searchOption['OFFSET'] = queries.offset ? parseInt(queries.offset, 10) : 0
  // searchOption.offset = queries.offset ? parseInt(queries.offset, 10) : 0
  // searchOption.distinct = '$Person.uniqueId$'
  // db.Official.count(searchOption)
  //   .then(function() {

  //   })
  // console.log(searchOption)
  // console.log('=====================')
  // console.log('before findAndCount')
  // console.log('=====================')
  // db.Official.findAndCountAll(searchOption)
  //     .then(function(officials) {

  // console.log('=====================')
  // console.log('after findAndCount')
  // console.log('=====================')
  //       result.count = officials.count.length
  //       var targets = officials.rows.map(function(o) {
  //         return o.Person.dataValues.uniqueId
  //       })
  //       // var targets = officials[0].map(function(o) {
  //       //   return o['personUniqueId']
  //       // })
        
  //       console.log('=====================')
  //       console.log('before findAll')
  //       console.log('=====================')
  //       db.Official.findAll({
  //         order: [['year', 'ASC']],
  //         include: [{
  //           model: db.Person,
  //           attributes: ['name', 'uniqueId'],
  //           where: { uniqueId: { $in: targets }}
  //         }, {
  //           model: db.Position,
  //           attributes: ['title'],
  //           include: [{
  //             model: db.Org3,
  //             attribute: ['title'],
  //             incude: [{
  //               model: db.Org2,
  //               attribute: ['title'],
  //               include: [{
  //                 model: db.Org1,
  //                 attribute: ['title']
  //               }]
  //             }]
  //           }]
  //         }]
  //       })
  //       .then(function(officials) {
  //         console.log('=====================')
  //         console.log('after findAll')
  //         console.log('=====================')
  //         result.officials = officials
  //         res.json(result)
  //       })
  //     })
  // })
  
  // db.Official.findAndCount(searchOption)

  //   .then(function (officials) {
  //     result.count = officials.count.length

      
}
