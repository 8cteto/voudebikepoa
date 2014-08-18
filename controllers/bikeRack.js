var 	url 		= require('url'),
	BikeRack 	= require('../model/bikeRack');

var BikeRackController = function() {
	this.nearestStation = function(req, res) {
		var 	queryString 	= url.parse(req.url, true),
			start 		= queryString.query.startPosition,
			end 		= queryString.query.endPosition;

		BikeRack.getNearestStation(start, function(startStation) {
			BikeRack.getNearestStation(end, function(endStation) {
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
