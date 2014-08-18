var BikeRack = require('../model/bikeRack');

var IndexController = function() {
	this.index = function(req, res) {
		BikeRack.findAll(function(result) {
			res.render('index.html', {racks: result});
		});
	};

};

module.exports = new IndexController();
