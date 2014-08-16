
var  pg = require('pg'),
       config  = require('../config'),
       url = require('url');

var BikeRackController = function() {
    this.nearestStation = function(req, res) {
        var latlng =  url.parse(req.url, true).position;

        db = new pg.Client(config.DATABASE_URL);

        db.connect(function(err) {
            if (err) {
                console.error('error running query', err);
                res.end();
                return;
            }

            db.query('SELECT * FROM nearest_bikestation(point($1::text))', [latlng], function(err, result) {
                if (err) {
                    console.error('error running query', err);
                    res.end();
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
