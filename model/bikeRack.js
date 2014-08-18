var BaseModel = require('./base');

var BikeRack = function() {
	var self = this;
	BaseModel.apply(this);

	this.findAll = function(callback) {
		self.query('SELECT nome,latitude,longitude FROM Estacoes_bikePOA', [], callback);
	};

	this.getNearestStation = function(latlng, callback) {
		self.query('SELECT * FROM nearest_bikestation(point($1::text))', [latlng], function(result) {
			callback({
				name: result.rows[0]['name'],
				lat: result.rows[0]['latitude'],
				lng: result.rows[0]['longitude']
			});
		});
	};

};

module.exports = new BikeRack();
