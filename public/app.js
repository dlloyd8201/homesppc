var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.port || 8080;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/contact', function(req, res) {
    var mailgun = require("mailgun-js");
    var DOMAIN = "813-mls.com";
    var mailgun = require('mailgun-js')({apiKey: "ef39694900089502d8c95bdc42d71226-2416cf28-7fb04b1a", domain: DOMAIN});
    var message = `
    name: ${req.body.name}
    email: ${req.body.email}
    phone: ${req.body.subject}
    address: ${req.body.message}
    `
    var data = {
        from: 'New Registration <noreply@813-mls.com>',
        to: "dlloyd8201@gmail.com",
        subject: 'New Registration',
        text: message
    };
    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
});

app.listen(port, function() {
    console.log("app listening on port 8080");
  });