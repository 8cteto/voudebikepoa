
var  pg = require('pg'),
       config  = require('../config'),
       url = require('url');

var BikeRackController = function() {
    this.nearestStation = function(req, res) {
        var latlng =  url.parse(req.url, true).position;

        db = new pg.Client(config.DATABASE_URL);

        db.connect(function(err) {
            if (err) {
                console.log('could not connect to postgres' + err);
                return;
            }

            db.query('SELECT * FROM nearest_bikestation(point($1::text))', [latlng], function(err, result) {
                db.end();
                if (err) {
                    res.end('error running query', err);
                    return;
                }

                res.setHeader("Content-Type", "text/json");

                res.end(JSON.stringify({
                    name: result.rows[0]['name'],
                    lat: result.rows[0]['latitude'],
                    lng: result.rows[0]['longitude']
                }));

                db.end();
            });
        });
    };
};

module.exports = new BikeRackController();
