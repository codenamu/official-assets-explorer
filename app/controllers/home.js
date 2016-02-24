var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Asset.findAll({
    include: [{
      model: db.Org_3,
      attributes: ['title'],
      include: [{
        model: db.Org_2,
        include: [{
          model: db.Org_1,
          attributes: ['title']
        }]
      }]
    },{
      model: db.Official,
      attributes: ['name']
    },{
      model: db.Cat_2,
      attributes: ['title'],
      include: [{
        model: db.Cat_1,
        attributes: ['title']
      }]
    }]
  })
  .then(function (assets) {
    res.render('index', {
      title: 'Official Assets Explorer',
      assets: assets
    });
  });
});
