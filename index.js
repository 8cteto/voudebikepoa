var	newrelic 	= require('newrelic'),
	express 	= require('express'),
	engine 		= require('ejs'),
	partials 	= require('express-partials'),
	config 		= require('./config'),
	app 		= express();

app.engine('html', engine.renderFile);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/assets'));
app.use(partials());
partials.register('.html', 'ejs');

// controllers
var	indexController 	= require('./controllers/indexController'),
	bikeRackController 	= require('./controllers/bikeRackController');

app.get('/', indexController.index);
app.get('/nearestStation', bikeRackController.nearestStation);

app.listen(config.WEBAPP_PORT);

console.log('Listening on port: ' + config.WEBAPP_PORT);
console.log('Press Ctrl + C to shutdown.');
