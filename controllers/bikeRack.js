
var  pg = require('pg'),
       config  = require('../config'),
       url = require('url');

function getNearestPosition(latlng, callback) {
    var db = new pg.Client(config.DATABASE_URL);

    db.connect(function(err) {
        if (err) {
            console.error('error running query', err);
            return;
        }

        db.query('SELECT * FROM nearest_bikestation(point($1::text))', [latlng], function(err, result) {
            if (err) {
                console.error('error running query', err);
                return;
            }

            callback({
                name: result.rows[0]['name'],
                lat: result.rows[0]['latitude'],
                lng: result.rows[0]['longitude']
            });

        });
    });
}

var BikeRackController = function() {
    this.nearestStation = function(req, res) {
        var start =  url.parse(req.url, true).startPosition;
        var end =  url.parse(req.url, true).endPosition;

        var result = {};

        getNearestPosition(start, function(startStation) {
            getNearestPosition(end, function(endStation) {
                res.setHeader("Content-Type", "text/json");
                res.end(JSON.stringify({
                    start: startStation,
                    end: endStation
                }));
            });
        })
    };
};

module.exports = new BikeRackController();
