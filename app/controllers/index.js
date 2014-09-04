var  pg = require('pg'),
       config  = require('../config');

var IndexController = function() {
    this.index = function(req, res) {
        db = new pg.Client(config.DATABASE_URL);

        db.connect(function(err) {
            if (err) {
                console.error('could not connect to postgres' + err);
                res.end();
                return;
            }

            db.query('SELECT nome,latitude,longitude FROM Estacoes_bikePOA', function(err, result) {
                if (err) {
                    console.error('error running query', err);
                    res.end();
                    return;
                }
                res.render('index.html', {text : result});
                db.end();
          });
        });
    };

    this.go = function(req, res) {
        res.render('go.html');
    };
};

module.exports = new IndexController();
