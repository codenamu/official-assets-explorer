var express = require('express')
var config = require('../../../config/config')
var util = require('util');
var SMTPConnection = require('smtp-connection');

module.exports = function() {
  var router = express.Router()

    var connection = new SMTPConnection({
        port: config.smtp.port,
        host: config.smtp.host,
        requireTLS: config.smtp.tlsOrSsl,
        connectionTimeout: 10 * 1000,
        authMethod: 'PLAIN',
        logger: true
    });
    connection.connect(function() {
        connection.login({
            domain: 'publicassets',
            user: config.smtp.user,
            pass: config.smtp.password
        }, function(err) {
            if (err) {
                throw err;
                return;
            }
        });
    });

  var message_template = "Subject: %s\n" + 
    "Reply-To: %s\n" + 
    "\n\n" + 
    "연락처: %s\n" + 
    "--------------------------------------------------------------------------------\n" + 
    "내용:\n" + 
    "%s\n"
  ;

  router.post('/', function(req, res, next) {
    var queries = req.body;

    connection.send(
        {
            from: queries.fromEmail,
            to: 'report@newstapa.org'
        },
        util.format(
            message_template,
            '고위공직자 재산 공개: ' + queries.type,
            queries.fromEmail,
            queries.fromContact ? queries.fromContact : queries.fromEmail,
            queries.content
        ),
        function(err) {
            if (err) {
                return res.json(err);
            }
            return res.json({message: "success"});
        }
    );

  })

  return router
}
