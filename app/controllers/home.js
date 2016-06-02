var express = require('express');
var config = require('../../config/config')
var api = require('./api');

module.exports = function (app) {
  app.use('/api', api());

  app.get('*', function(req, res) {
    res.render('index', {
      ga: config.ga,
      ga_2: config.ga_2,
      host: config.host
    });
  });
};
