var express = require('express'),
      config  = require('./config'),
      engine = require('ejs'),
      app  = express();

app.engine('html', engine.renderFile);
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/assets'))

// controllers
var indexController = require('./controllers/IndexController'),
      bikeRackController = require('./controllers/BikeRackController');

app.get('/', indexController.index);
app.get('/go', indexController.go);

app.listen(config.WEBAPP_PORT);

console.log('Listening on port: ' + config.WEBAPP_PORT);
console.log('Press Ctrl + C to shutdown.');
