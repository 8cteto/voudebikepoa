var express = require('express'),
      config  = require('./config'),
      pg = require('pg'); 
      app  = express();

app.get('/', function(req, res){

    db = new pg.Client(config.DATABASE_URL);

    db.connect(function(err) {
        if (err) {
            res.send('could not connect to postgres');
            return;
        }

        db.query('SELECT \'Vour de Bike!\' as text', function(err, result) {
            db.end();
            if (err) {
                res.send('error running query', err);
                return;
            }

            res.send(result.rows[0]['text']);
            db.end();
      });
    });
});

app.listen(config.WEBAPP_PORT);
console.log('Listening on port: ' + config.WEBAPP_PORT);
console.log('Press Ctrl + C to shutdown.');
