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
        var province = {}
        var municipals = []
        var dongs = []
        var constituencies = []
        var persons = []
        var officials = []
        var publishers = []
        var orgs = []
        var positions = []
        var cat1 = []
        var cat2 = []

        db.Province.create({ name: '서울특별시' })
          .then(function(result) {
            province = result
            return db.Municipal.bulkCreate([
              { name: '종로구', provinceId: province.id },
              { name: '성동구', provinceId: province.id }
            ])
          })
          .then(function() {
            return db.Municipal.findAll()
          })
          .then(function(result) {
            municipals = result
            return db.Constituency.bulkCreate([
              { name: '서울 종로구', uniqueId: 1 },
              { name: '서울 마포구을', uniqueId: 2 }
            ])
          })
          .then(function() {
            return db.Constituency.findAll()
          })
          .then(function(result) {
            constituencies = result
            return db.Dong.bulkCreate([
              { name: '마장동', municipalId: municipals[1].id },
              { name: '사근동', municipalId: municipals[1].id },
              { name: '종로구 전체', municipalId: municipals[0].id }
            ])
          })
          .then(function() {
            return db.Dong.findAll()
          })
          .then(function(result) {
            dongs = result
            return constituencies[1].addDong(dongs.slice(0, 2))
          })
          .then(function() {
            return constituencies[0].addDong(dongs.slice(2, 3))
          })
          .then(function() {
            return db['Person'].bulkCreate([
              { name: '박근혜', uniqueId: 'open42976', profileImage: 'https://avatars1.githubusercontent.com/u/1366161?v=3&s=460', ConstituencyId: constituencies[0].dataValues.id, election: true},
              { name: '김기춘', uniqueId: 'open42977', profileImage: 'https://avatars1.githubusercontent.com/u/1366161?v=3&s=460', ConstituencyId: constituencies[1].dataValues.id, election: true },
              { name: '유민봉', uniqueId: 'open42978', profileImage: 'https://avatars1.githubusercontent.com/u/1366161?v=3&s=460', ConstituencyId: constituencies[0].dataValues.id, election: true }
            ])
          })
          .then(function() {
            return db['Person'].findAll()
          })
          .then(function(result) {
            persons = result
            return db['Publisher'].bulkCreate([
              { title: '정부공직자윤리위원회' }
            ])
          })
          .then(function() {
            return db['Publisher'].findAll()
          })
          .then(function(result) {
            publishers = result
            return db['Org1'].bulkCreate([
              { title: '중앙부처 및 산하기관', publisherId: publishers[0].id },
            ])
          })
          .then(function() {
            return db['Org1'].findAll()
          })
          .then(function(result) {
            org1s = result
            console.log(org1s[0].id)
            return db['Org2'].bulkCreate([
              { title: '대통령', org1Id: org1s[0].id },
              { title: '대통령 비서실', org1Id: org1s[0].id }
            ])
          })
          .then(function() {
            return db['Org2'].findAll()
          })
          .then(function(result) {
            org2s = result
            return db['Org3'].bulkCreate([
              { title: '대통령', org2Id: org2s[0].id },
              { title: '대통령 비서실', org2Id: org2s[1].id }
            ])
          })
          .then(function() {
            return db['Org3'].findAll()
          })
          .then(function(result) {
            org3s = result
            return db['Position'].bulkCreate([
              { title: '대통령', org3Id: org3s[0].id },
              { title: '대통령 비서실장', org3Id: org3s[1].id },
              { title: '국정기획 수석비서관', org3Id: org3s[1].id }
            ])
          })
          .then(function() {
            return db['Position'].findAll()
          })
          .then(function(result) {
            positions = result
            return db['Official'].bulkCreate([
              {personId: persons[0].id, positionId: positions[0].id, year: 2015},
              {personId: persons[1].id, positionId: positions[1].id, year: 2015},
              {personId: persons[2].id, positionId: positions[2].id, year: 2015},
              {personId: persons[0].id, positionId: positions[0].id, year: 2014},
              {personId: persons[1].id, positionId: positions[1].id, year: 2014},
              {personId: persons[2].id, positionId: positions[2].id, year: 2014}
            ])
          })
          .then(function() {
            return db['Official'].findAll()
          })
          .then(function(result) {
            officials = result
            return db['Cat1'].bulkCreate([
              { title: '건물' },
              { title: '예금' },
              { title: '부동산에 관한 규정이 준용되는 권리와 자동차․건설기계․선박 및 항공기'}
            ])
          })
          .then(function() {
            return db['Cat1'].findAll()
          })
          .then(function(result) {
            cat1s = result
            return db['Cat2'].bulkCreate([
              { title: '단독주택', cat1Id: cat1s[0].id },
              { title: '아파트', cat1Id: cat1s[0].id },
              { title: '예금', cat1Id: cat1s[1].id },
              { title: '자동차', cat1Id: cat1s[2].id }
            ])
          })
          .then(function() {
            return db['Cat2'].findAll()
          })
          .then(function(result) {
            cat2s = result
            // for(var method in org_2) {
            //   console.log(method)
            // }
            return db['Asset'].bulkCreate([
              {
                openId: 'open42976',
                relation: '본인',
                prevTotal: 2300000,
                change: 60000,
                total: 2360000,
                description: '서울특별시 강남구 삼성동 대지 484.00㎡ 건물 317.35㎡',
                reason: '가액변동',
                cat2Id: cat2s[0].id,
                officialId: officials[0].id
              }, {
                openId: 'open42976',
                relation: '본인',
                prevTotal: 533585,
                change: 275920,
                total: 809505,
                description: '대우증권 18,953(2,039 증가), 외환은행 325,929(62,013 증가), 우리은행 0(34 감소), 신한은행 105, 농협은행 464,518(212,011 증가), 화원새마을금고 0(109 감소)',
                reason: '인세 등 예금액 증가',
                cat2Id: cat2s[2].id,
                officialId: officials[0].id
              }, {
                openId: 'open36233',
                relation: '본인',
                prevTotal: 2300000,
                change: 0,
                total: 2300000,
                description: '서울특별시 강남구 삼성동 대지 484.00㎡ 건물 317.35㎡',
                reason: '가액변동 없음',
                cat2Id: cat2s[0].id,
                officialId: officials[3].id
              }, {
                openId: 'open36233',
                relation: '본인',
                prevTotal: 19940,
                change: 19940,
                total: 0,
                description: '2008년식 베라크루즈 배기량(3,778cc)',
                reason: '매도',
                cat2Id: cat2s[3].id,
                officialId: officials[3].id
              }, {
                openId: 'open42977',
                relation: '본인',
                prevTotal: 1020000,
                change: 80000,
                total: 1100000,
                description: '서울특별시 종로구 평창동 대지 698.00㎡ 건물 275.12㎡',
                reason: '가액변동',
                cat2Id: cat2s[0].id,
                officialId: officials[1].id
              }, {
                openId: 'open42977',
                relation: '본인',
                prevTotal: 141000,
                change: 3000,
                total: 144000,
                description: '경상남도 거제시 고현동 신화인아파트 건물 84.43㎡',
                reason: '가액변동',
                cat2Id: cat2s[1].id,
                officialId: officials[1].id
              }, {
                openId: 'open36235',
                relation: '본인',
                prevTotal: 1020000,
                change: 0,
                total: 1020000,
                description: '서울특별시 종로구 평창동 대지 698.00㎡ 건물 275.12㎡',
                reason: '가액변동 없음',
                cat2Id: cat2s[0].id,
                officialId: officials[4].id
              }, {
                openId: 'open36235',
                relation: '본인',
                prevTotal: 141000,
                change: 0,
                total: 141000,
                description: '경상남도 거제시 고현동 신화인아파트 건물 84.43㎡',
                reason: '가액변동 없음',
                cat2Id: cat2s[1].id,
                officialId: officials[4].id
              }, {
                openId: 'open42978',
                relation: '본인',
                prevTotal: 25060,
                change: -3400,
                total: 21660,
                description: '2013년식 싼타페 배기량(1,995cc)',
                cat2Id: cat2s[3].id,
                officialId: officials[2].id
              }, {
                openId: 'open42978',
                relation: '본인',
                prevTotal: 468000,
                change: -8000,
                total: 460000,
                description: '서울특별시 성동구 옥수동 극동그린아파트 건물 114.32㎡',
                reason: '가액변동',
                cat2Id: cat2s[1].id,
                officialId: officials[2].id
              }
            ])
            .then(function() {
              console.log('Express server listening on port ' + config.port)
            })
          })
      }

      
    })
  }).catch(function (e) {
    throw new Error(e)
  })

