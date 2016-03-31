var express = require('express')
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('ITvMCZ5cJMO7EXBDltxAAA');

module.exports = function() {
  var router = express.Router()

  router.post('/', function(req, res, next) {
    var queries = req.body
    var fromEmail = queries.fromEmail
    var html = '<p>' + queries.content + '</p>'
    var subject = '고위공직자 재산 공개 - ' + queries.type

    var message = {
      'html': html,
      'text': '텍스트 영역',
      'subject': subject,
      'from_email': fromEmail,
      'from_name': fromEmail,
      'to': [{
              'email': 'data@newstapa.org',
              'name': '뉴스타파',
              'type': 'to'
          }],
      'headers': {
          'Reply-To': 'data@newstapa.org'
      }
    };

    var async = false;
    mandrill_client.messages.send({"message": message, "async": async}, function(result) {
        res.json(result)
        
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        res.json(e)
    });
  })

  return router
}
