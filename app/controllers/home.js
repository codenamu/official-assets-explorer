var express = require('express');
var api = require('./api');

module.exports = function (app) {
  app.use('/api', api());

  app.get('*', function(req, res) {
    res.render('index');
  });
};

