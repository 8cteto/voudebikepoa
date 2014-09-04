var BikeRack = require('../../model/bikeRack');

describe('Validando o model bikeRack', function() {

	var 	self = this;
		bikeRack = BikeRack;

	beforeEach(function() {
		self.validRow = {
			nome: 'Bike Rack',
			endereco: 'Address, 123',
			latitude: 51.5033630,
			longitude: -0.1776250,
			num_bicicletas: 12,
			vagas_ocupadas: 4,
			status_online: 'A',
			status_operacao: 'EO'
		};
	});

	it ('Deve procurar todos os bicicletarios disponiveis', function() {
		var expectedResult = self.validRow;
		bikeRack.query = function(query, params, cb) {
			cb({rows: [expectedResult]});
		};

		bikeRack.findAll(function(result) {
			expect(result.length).toBe(1);

			var rack = result[0];
			expect(rack.name).toBe(expectedResult.nome);
			expect(rack.address).toBe(expectedResult.endereco);
			expect(rack.lat).toBe(expectedResult.latitude);
			expect(rack.lng).toBe(expectedResult.longitude);
			expect(rack.totalSpots).toBe(expectedResult.num_bicicletas);
			expect(rack.availableBikes).toBe(4);
			expect(rack.availableSpots).toBe(8);
			expect(rack.online).toBe(true);
		});
	});

	it ('Deve substituir underline por espaco na descrição dos bicicletarios', function() {
		var expectedResult = self.validRow;
		expectedResult.nome = 'Rack_Name';

		bikeRack.query = function(query, params, cb) {
			cb({rows: [expectedResult]});
		};

		bikeRack.findAll(function(result) {
			var rack = result[0];
			expect(rack.name).toBe('Rack Name');
		});
	});

	it ('Deve deve considerar rack offline caso status online diferente de "A"', function() {
		var expectedResult = self.validRow;
		expectedResult.status_online = 'X';

		bikeRack.query = function(query, params, cb) {
			cb({rows: [expectedResult]});
		};

		bikeRack.findAll(function(result) {
			var rack = result[0];
			expect(rack.online).toBe(false);
		});
	});

	it ('Deve deve considerar rack offline caso status operacao diferente de "EO"', function() {
		var expectedResult = self.validRow;
		expectedResult.status_operacao = 'EI';

		bikeRack.query = function(query, params, cb) {
			cb({rows: [expectedResult]});
		};

		bikeRack.findAll(function(result) {
			var rack = result[0];
			expect(rack.online).toBe(false);
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
