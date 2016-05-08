var express = require('express')
var db = require('../../models')
var official = require('./official')
var org = require('./org')
var province = require('./province')
var municipal = require('./municipal')
var dong = require('./dong')
var email = require('./email')
var survey = require('./survey')
var log = require('./log')

module.exports = function() {
  var router = express.Router()

  router.use('/official', official())
  router.use('/org', org())
  router.use('/province', province())
  router.use('/municipal', municipal())
  router.use('/dong', dong())
  router.use('/send', email())
  router.use('/survey', survey())
  router.use('/log', log())
  router.get('/', function (req, res, next) {
    res.json({
      version: '0.1.0'
    })
  })

  return router
}
