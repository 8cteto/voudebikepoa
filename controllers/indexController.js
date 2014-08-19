var BikeRack = require('../model/bikeRack');

var IndexController = function() {
	this.index = function(req, res) {
		res.render('index.html');
	};

};

module.exports = new IndexController();
