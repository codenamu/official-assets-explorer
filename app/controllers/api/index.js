var express = require('express');
var db = require('../../models');
var official = require('./official');

module.exports = function() {
  var router = express.Router();

  router.use('/official', official());
  router.get('/', function (req, res, next) {
    res.json({
      version: '0.1.0'
    });
  });

  return router;
}
