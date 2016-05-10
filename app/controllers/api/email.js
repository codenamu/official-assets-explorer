var express = require('express')
var config = require('../../../config/config')
var sendgrid = require('sendgrid')(config.sendgrid.apikey)

module.exports = function() {
  var router = express.Router()

  router.post('/', function(req, res, next) {
    var queries = req.body
    var fromEmail = queries.fromEmail
    var html = '<p>' + queries.content + '</p>'
    var subject = '고위공직자 재산 공개 - ' + queries.type

    var email = new sendgrid.Email({
      to:       'data@codenamu.org',
      from:     fromEmail,
      subject:  subject,
      html:     html
    })

    return sendgrid.send(email, function(err, json) {
      if (err) { return res.json(err); }
      return res.json(json)
    })
  })

  return router
}
