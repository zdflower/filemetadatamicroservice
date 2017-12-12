'use strict';

var express = require('express');
var app = express();

var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage: storage});

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendFile( __dirname + '/views/index.html' );
});

//como argumento de upload.single() va el name del campo del formulario donde se selecciona el archivo
app.post('/', upload.single('file'), function(req, res) {
    res.send({"size" : req.file.size});
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
