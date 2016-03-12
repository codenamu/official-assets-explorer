var express = require('express'),
  config = require('./config/config'),
  env = process.env.NODE_ENV || 'development',
  db = require('./app/models')

var app = express()

require('./config/express')(app, config)

db.sequelize
  .sync({force:config.sync})
  .then(function () {
    app.listen(config.port, function () {
      // create fake data for test
      if (env === 'development') {
        var persons = []
        var officials = []
        var publishers = []
        var orgs = []
        var positions = []
        var cat1 = []
        var cat2 = []

        db['Person'].bulkCreate([
            { name: '장승훈', uniqueId: 1 },
            { name: '김강민', uniqueId: 2 },
            { name: '최윤원', uniqueId: 3 }
          ])
          .then(function() {
            return db['Person'].findAll()
          })
          .then(function(result) {
            persons = result
            return db['Publisher'].bulkCreate([
              { title: '정부' },
              { title: '국회' }
            ])
          })
          .then(function() {
            return db['Publisher'].findAll()
          })
          .then(function(result) {
            publishers = result
            return db['Org'].bulkCreate([
              { title: '대통령 비서실', publisherId: publishers[0].id },
              { title: '국회', publisherId: publishers[1].id }
            ])
          })
          .then(function() {
            return db['Org'].findAll()
          })
          .then(function(result) {
            orgs = result
            return db['Position'].bulkCreate([
              { title: '국정기획수석비서관', orgId: orgs[0].id },
              { title: '국회의원', orgId: orgs[1].id }
            ])
          })
          .then(function() {
            return db['Position'].findAll()
          })
          .then(function(result) {
            positions = result
            return db['Official'].bulkCreate([
              {personId: persons[0].id, positionId: positions[0].id, year: 2012},
              {personId: persons[1].id, positionId: positions[1].id, year: 2014},
              {personId: persons[2].id, positionId: positions[1].id, year: 2015},
              {personId: persons[0].id, positionId: positions[1].id, year: 2015}
            ])
          })
          .then(function() {
            return db['Official'].findAll()
          })
          .then(function(result) {
            officials = result
            return db['Cat_1'].bulkCreate([
              { title: '건물' },
              { title: '예금' }
            ])
          })
          .then(function() {
            return db['Cat_1'].findAll()
          })
          .then(function(result) {
            cat1s = result
            return db['Cat_2'].bulkCreate([
              { title: '단독주택', cat1Id: cat1s[0].id },
              { title: '아파트', cat1Id: cat1s[0].id },
              { title: '예금', cat1Id: cat1s[1].id }
            ])
          })
          .then(function() {
            return db['Cat_2'].findAll()
          })
          .then(function(result) {
            cat2s = result
            // for(var method in org_2) {
            //   console.log(method)
            // }
            return db['Asset'].bulkCreate([
              {
                relation: '본인',
                change: 1,
                total: 236,
                description: '서울특별시 강남구 삼성동 대지 484.00㎡ 건물 317.35㎡',
                cat2Id: cat2s[0].id,
                officialId: officials[0].id
              }, {
                relation: '본인',
                change: 2,
                total: 26,
                description: '국민은행 예금',
                cat2Id: cat2s[1].id,
                officialId: officials[1].id
              }, {
                relation: '본인',
                change: 6,
                total: 4236,
                description: '서울특별시 강남구 삼성동 대지 484.00㎡ 건물 317.35㎡',
                cat2Id: cat2s[0].id,
                officialId: officials[2].id
              }
            ])
          })
      }

      console.log('Express server listening on port ' + config.port)
    })
  }).catch(function (e) {
    throw new Error(e)
  })

