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
        var official, org_1, org_2, org_3, cat_1, cat_2;

        db['Official'].create({name: '누굴까'})
          .then(function(off) {
            official = off
            return db['Org_1'].create({title: '대통령 비서실'})
          })
          .then(function(org1) {
            org_1 = org1
            return db['Org_2'].create({title: '대통령 비서실', org1Id: org1.id})
          })
          .then(function(org2) {
            org_2 = org2
            return db['Org_3'].create({title: '국정기획수석비서관', org2Id: org2.id})
          })
          .then(function(org3) {
            org_3 = org3
            return db['Cat_1'].create({title: '건물'})
          })
          .then(function(cat1) {
            cat_1 = cat1
            return db['Cat_2'].create({title: '단독주택', cat1Id: cat1.id})
          })
          .then(function(cat2) {
            cat_2 = cat2
          //   return org_3.addOrg_2(org_2)
          // })
          // .then(function() {
            // for(var method in org_2) {
            //   console.log(method);
            // }
            return db['Asset'].create({
              year: 2015,
              relation: '본인',
              change: 6,
              total: 236,
              description: '서울특별시 강남구 삼성동 대지 484.00㎡ 건물 317.35㎡',
              cat2Id: cat_2.id,
              org3Id: org_3.id,
              officialId: official.id
            })
          })
      }

      console.log('Express server listening on port ' + config.port)
    })
  }).catch(function (e) {
    throw new Error(e)
  })

