$(function() {

	var MapController = function(mapContainer) {
		var self = this

		// porto alegre
		self.initialAddress = new google.maps.LatLng(-30.0359, -51.2048);
		self.defaultMapZoom = 12;

		self.directionsService = new google.maps.DirectionsService();
		self.geometryService = google.maps.geometry.spherical;
		self.geocoder = new google.maps.Geocoder(),
		self.directionsDisplay = new google.maps.DirectionsRenderer({
			suppressMarkers: true
		});
		self.bikeRacks = [];
		self.currentPosition = undefined;
		self.destinationPosition = undefined;

		this.initialize = function() {
			var mapOptions = {
				zoom: self.defaultMapZoom,
				center: self.initialAddress,
				scrollwheel:false
			};

			self.map = new google.maps.Map(mapContainer, mapOptions);
		};

		this.setCurrentPosition = function(lat, lng) {
			self.clearCurrentPosition();
			self.currentPosition = self.createMarker('Você está aqui', lat, lng, {icon: '/images/currentLocation.png'});
		};

		this.setDestinationPosition = function(lat, lng, text) {
			self.clearDestinationPosition();
			self.destinationPosition = self.createMarker('Você quer chegar aqui', lat, lng, {icon: '/images/targetLocation.png'}, text);
		};

		this.clearCurrentPosition = function() {
			if (!self.currentPosition) 
				return;

			self.currentPosition.setMap(null);
			self.currentPosition = undefined;
		};

		this.clearDestinationPosition = function() {
			if (!self.destinationPosition) 
				return;

			self.destinationPosition.setMap(null);
			self.destinationPosition = undefined;
		};

		this.addBikeRack = function(rack) {
			var icon = rack.online ? '/images/bikeRackOnline.png' : '/images/bikeRackOffline.png';

			var info = '<div style="display: inline-block; width: 250px; height: 100px">' +
				'<b>' + rack.name + '</b>' +
				'<br>' + rack.address +
				'<br><b>Status:</b> ' + (rack.online ? 'Em operação' : 'Fora de operação') +
				'<br><b>Bicicletas disponíveis:</b> ' + rack.availableBikes + 
				'<br><b>Vagas disponíveis:</b> ' + rack.availableSpots +
				'</div>';

			var marker = self.createMarker(rack.name, rack.lat, rack.lng, {icon : icon}, info);
			self.bikeRacks.push(marker);
		};

		this.createMarker = function(name, lat, lng, opts, info) {
			var position = new google.maps.LatLng(lat, lng);

			var infoContent = info || name;

			var options = {
				title: name,
				position: position,
				map: self.map
			};

			$.extend(options, opts || {});

			var marker = new google.maps.Marker(options);

			google.maps.event.addListener(marker, 'click', function() {
				if (self.currentInfoWindow) 
					self.currentInfoWindow.close();

				self.currentInfoWindow = new google.maps.InfoWindow({
					content: infoContent
				});

				self.currentInfoWindow.open(self.map, marker);
			});

			return marker;
		};

		this.reset = function() {
			self.directionsDisplay.setMap(null);
			self.displayAllBikeRacks();
			self.clearDestinationPosition();
			self.map.setZoom(self.defaultMapZoom);
			self.map.panTo(self.initialAddress);
		};

		this.setRoute = function(routePoints) {
			var 	startPosition = self.createPosition(routePoints.shift()),
				endPosition = self.createPosition(routePoints.pop());

			var routePositions = self.createPositions(routePoints);
			var wayPoints = self.createWayPoints(routePositions);

			var request = {
				origin: startPosition,
				destination: endPosition,
				waypoints: wayPoints,
				travelMode: google.maps.TravelMode.WALKING
			};

			self.displayAllBikeRacks();

			self.directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					self.directionsDisplay.setDirections(response);
					self.directionsDisplay.setMap(self.map);
				}

				self.hideBikeRacksOutOfRoute(routePositions);
			});
		};

		this.createWayPoints = function(positions) {
			return positions.map(function(position) {
				return  {
					location: position,
					stopover: true
				};
			});
		};

		this.createPositions = function(positions) {
			return positions.map(self.createPosition);
		};

		this.createPosition = function(position) {
			return new google.maps.LatLng(position[0], position[1]);
		};

		this.displayAllBikeRacks = function() {
			for (var index in self.bikeRacks) {
				self.bikeRacks[index].setMap(self.map);
			}
		};

		this.hideBikeRacksOutOfRoute = function(routePoints) {
			var racksOutOfRoute = self.bikeRacks.filter(function(bikeRack) {
				var positionsPassingInThisRack = routePoints.filter(function(routePoint) {
					return self.isSameCoordinate(bikeRack.getPosition(), routePoint); 
				});

				return positionsPassingInThisRack.length == 0;
			});

			$.each(racksOutOfRoute, function(i, rack) {
				rack.setMap(null);
			});
		};

		this.isSameCoordinate = function(positionOne, positionTwo) {
			var distance = self.geometryService.computeDistanceBetween(positionOne, positionTwo);
			return distance <= 10;
		};

		self.initialize();
	};

	var GeocodeController = function() {
		var 	self = this,
			geocoder = new google.maps.Geocoder();

		this.findAddresByGeoLocation = function(lat, lng, callback) {
			var latlng = new google.maps.LatLng(lat, lng);
			geocoder.geocode({'latLng': latlng}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) 
					callback(results[0].formatted_address);
			});
		};

		this.findGeoLocationByAddress = function(address, callback) {
			var findAddress = address + ', Porto Alegre, RS, Brasil';

			geocoder.geocode( { 'address': findAddress } , function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var result = results[0];

					callback({
						formatted_address: result.formatted_address,
						lat: result.geometry.location.lat(),
						lng: result.geometry.location.lng()
					});
				}
			});
		};
	};

	var 	self = this,
		targetFrom = $('#targetFrom'),
		targetTo = $('#targetTo'),
		inputForm = $('#map-input-form'),
		mapContainer = $('#map-canvas');
		mapController = undefined
		geocodeController = new GeocodeController();

	function initialize() {
		mapController = new MapController(mapContainer[0]);
		verifyCurrentLocation();
		loadBikeRacks();
	}

	$().add(targetFrom).add(targetTo).on('change', function(e) {
		$(this).attr('data-pos', '');
	});

	function verifyCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				mapController.setCurrentPosition(position.coords.latitude, position.coords.longitude);

				geocodeController.findAddresByGeoLocation(position.coords.latitude, position.coords.longitude, function(result) {
					targetFrom.val(result).attr('data-pos', joinPosition(position.coords.latitude, position.coords.longitude));
					inputForm.trigger('address-resolved');
				});
			});
		} else {
			setNotFoundFromTarget();
		}
	}

	function loadBikeRacks() {
		$.getJSON('/bikeRack/all', function(data) {
			$.each(data, function(index, rack) {
				mapController.addBikeRack(rack);
			});
		});
	}

	function joinPosition(lat, lng) {
		return lat + ',' + lng;
	}

	function splitPosition(position) {
		return position.split(',');
	}

	function verifyAddress(targetElement) {
		var address = targetElement.val() + ', Porto Alegre, RS, Brasil';
		geocodeController.findGeoLocationByAddress(address, function(result) {
			var position = joinPosition(result.lat, result.lng);
			targetElement.val(result.formatted_address).attr('data-pos', position);
			inputForm.trigger('address-resolved');
		});
	}

	function setNotFoundFromTarget() {
		targetFrom.attr('placeholder', 'Digite o endereço de origem');
	}

	function focusMap() {
		$(window).scrollTop(mapContainer.offset().top);
	}

	function hasAddress(target) {
		var address = target.val();
		return address && address.length > 0;
	}

	function addressAlreadyResolved(target) {
		var pos = target.attr('data-pos');
		return pos && pos.length > 0;
	}

	inputForm.on('submit', function(e) {
		e.preventDefault();

		if (!hasAddress(targetFrom)) {
			alert('Informe o local de origem!');
			return;
		}

		if (!hasAddress(targetTo)) {
			alert('Informe o local de destino!');
			return;
		}

		if (!addressAlreadyResolved(targetFrom))
			verifyAddress(targetFrom);

		if (!addressAlreadyResolved(targetTo))
			verifyAddress(targetTo);

	}).on('address-resolved', function() {
		if (!hasAddress(targetFrom) || !hasAddress(targetTo) || !addressAlreadyResolved(targetFrom) || !addressAlreadyResolved(targetTo))
			return;

		applyRouteOnMap();
	}).on('reset', function(e) {
		e.preventDefault();
		mapController.reset();
		targetTo.val('').attr('data-pos', '');
	});

	function applyRouteOnMap() {
		var 	startPosition = targetFrom.attr('data-pos'),
			endPosition = targetTo.attr('data-pos');

		$.get('/bikeRack/nearestBikeRack?startPosition=' + startPosition + '&endPosition=' + endPosition, function(data) {
			var destination = splitPosition(endPosition);
			mapController.setDestinationPosition(destination[0], destination[1], targetTo.val());

			mapController.setRoute([
				splitPosition(targetFrom.attr('data-pos')),
				[data.start.lat, data.start.lng], 
				[data.end.lat, data.end.lng],
				splitPosition(targetTo.attr('data-pos'))
			]);

			focusMap();
		});
	}

	initialize();
});
