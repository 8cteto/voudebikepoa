var BikeRack = require('../../model/bikeRack');

describe('Validando o model bikeRack', function() {

	var bikeRack = BikeRack;

	it ('Deve procurar todos os bicicletarios disponiveis', function() {
		var expectedResult = {rows: [{
			latitude:1, longitude: 1, nome:'Name'}]};

		bikeRack.query = function(query, params, cb) {
			cb(expectedResult);
		};

		bikeRack.findAll(function(result) {
			expect(result.name).toBe(expectedResult.nome);
			expect(result.lat).toBe(expectedResult.latitude);
			expect(result.lng).toBe(expectedResult.longitude);
		});
	});

	it ('Deve procurar bicicletario mais proximo a um ponto', function() {
		var 	latlng = '123,456',
			expectedResult = {name: 'Nome', latitude: 1, longitude:2};

		bikeRack.query = function(query, params, cb) {
			cb({rows : [expectedResult]});
			expect(params.length).toBe(1);
			expect(params[0]).toBe(latlng);
		};

		bikeRack.getNearestStation(latlng, function(result) {
			expect(result['name']).toBe(expectedResult['name']);
			expect(result['lat']).toBe(expectedResult['latitude']);
			expect(result['lng']).toBe(expectedResult['longitude']);
		});
	});

});
