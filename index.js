var express = require('express'),
      config  = require('./config'),
      app  = express();

app.get('/', function(req, res){
  res.send('Vour de Bike!');
});

app.listen(config.WEBAPP_PORT);
console.log('Listening on port: ' + config.WEBAPP_PORT);
console.log('Press Ctrl + C to shutdown.');