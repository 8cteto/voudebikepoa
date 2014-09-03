var 	url 		= require('url'),
	BikeRack 	= require('../model/bikeRack');

var BikeRackController = function() {
	var self = this;

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

	this.listAll = function(req, res) {
		BikeRack.findAll(function(result) {
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify(result.rows.map(self.createFromDataRow)));
		});
	};

	this.nearestBikeRack = function(req, res) {
		var 	queryString 	= url.parse(req.url, true),
			start 		= queryString.query.startPosition,
			end 		= queryString.query.endPosition;

		BikeRack.getNearestStation(start, function(startStation) {
			BikeRack.getNearestStation(end, function(endStation) {
				res.setHeader("Content-Type", "application/json");
				res.end(JSON.stringify({
					start: startStation,
					end: endStation
				}));
			});
		})
	};
};

module.exports = new BikeRackController();
