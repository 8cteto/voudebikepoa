var 	pg 	= require('pg'),
  	config  = require('.././config');

var BaseModel = function() {
	var self = this;

	this.createStatement = function(callback) {
		db = new pg.Client(config.DATABASE_URL);

		db.connect(function(err) {
			if (err) {
				console.error('Error during databse connection:' + err);
				return;
			}

			callback(db);
		});
	};

	this.query = function(query, params, callback) {
		self.createStatement(function(stm) {
			stm.query(query, params, function(err, result) {
				stm.end();

				if (err) {
					console.error('Error execution query' + err);
					return;
				}

				callback(result);
			});
		});
	};

};

module.exports = BaseModel;
