var BaseModel = require('./base');

var BikeRack = function() {
	var self = this;

	BaseModel.apply(this);

	var OPERATION_STATUS = {
		EM_OPERACAO : 'EO',
		EM_MANUTENCAO: 'EM',
		EM_IMPLANTACAO: 'EI'
	};

	this.translateOnlineStatus = function(onlineStatus, operationStatus) {
		return onlineStatus == 'A' && OPERATION_STATUS.EM_OPERACAO == operationStatus;
	};

	this.translateAvailableSpots = function(totalSpots, occupiedSpots) {
		return totalSpots - occupiedSpots;
	}

	this.createFromDataRow = function(row) {
		return {
			name: row['nome'].replace(/\_/g, ' '),
			address: row['endereco'],
			lat: row['latitude'],
			lng: row['longitude'],
			totalSpots: row['num_bicicletas'],
			availableBikes: row['vagas_ocupadas'],
			availableSpots: self.translateAvailableSpots(row['num_bicicletas'], row['vagas_ocupadas']),
			online: self.translateOnlineStatus(row['status_online'], row['status_operacao'])
		};
	};

	this.findAll = function(callback) {
		self.query('SELECT * FROM Estacoes_bikePOA', [], function(result) {
			callback(result.rows.map(self.createFromDataRow));
		});
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
