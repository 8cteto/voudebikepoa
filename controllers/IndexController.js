var  pg = require('pg'),
       config  = require('../config');

var IndexController = function() {
    this.index = function(req, res) {
        db = new pg.Client(config.DATABASE_URL);

        db.connect(function(err) {
            if (err) {
                console.log('could not connect to postgres' + err);
                return;
            }

            db.query('SELECT \'Vou de Bike!\' as text', function(err, result) {
                db.end();
                if (err) {
                    res.end('error running query', err);
                    return;
                }

                res.render('index.html', {text : result.rows[0]['text']});

                db.end();
          });
        });
    };

    this.go = function(req, res) {
        res.render('go.html');
    };
};

module.exports = new IndexController();
