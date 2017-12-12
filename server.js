'use strict';

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded( { extended: false } ));

app.get('/', function(req, res) {
		  res.sendFile( __dirname + '/views/index.html' );
    });

 app.post('/', function(req, res) {
    res.send(req.body);
 });
    
// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT || 4000, function () {
  console.log('Node.js listening ...');
});

