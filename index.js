var newrelic = require('newrelic'),
	express = require('express'),
	config = require('./config'),
	engine = require('ejs'),
	partials = require('express-partials'),
	app = express();

app.engine('html', engine.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/assets'));
app.use(partials());
partials.register('.html','ejs'); 

// controllers
var indexController = require('./controllers/index'),
      bikeRackController = require('./controllers/bikeRack');

app.get('/', indexController.index);
app.get('/nearestStation', bikeRackController.nearestStation);
app.get('/go', indexController.go);

app.listen(config.WEBAPP_PORT);

console.log('Listening on port: ' + config.WEBAPP_PORT);
console.log('Press Ctrl + C to shutdown.');
