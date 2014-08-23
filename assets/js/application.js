$(function() {

	var MapController = function(mapContainer) {
		var self = this

		// porto alegre
		self.initialAddress = new google.maps.LatLng(-30.0359, -51.2048);
		self.defaultMapZoom = 12;

		self.directionsService = new google.maps.DirectionsService();
		self.geocoder = new google.maps.Geocoder(),
		self.directionsDisplay = new google.maps.DirectionsRenderer({
			suppressMarkers: true
		});
		self.bikeRacks = [];

		this.initialize = function() {
			var isDraggable = $(document).width() > 480;

			var mapOptions = {
				zoom: self.defaultMapZoom,
				center: self.initialAddress,
				scrollwheel:false,
				draggable:isDraggable
			};

			self.map = new google.maps.Map(mapContainer, mapOptions);
		};

		this.setCurrentPosition = function(lat, lng) {
			self.createMarker('Meu Local', lat, lng);
		};

		this.addBikeRack = function(name, lat, lng) {
			var marker = self.createMarker(name, lat, lng, {icon : '/images/icone-estacoes.gif'});
			self.bikeRacks.push(marker);
		};

		this.createMarker = function(name, lat, lng, opts) {
			var position = new google.maps.LatLng(lat, lng);

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
					content: name
				});

				self.currentInfoWindow.open(self.map, marker);
			});

			return marker;
		};

		this.reset = function() {
			self.directionsDisplay.setMap(null);
			self.displayAllBikeRacks();
			self.map.setZoom(self.defaultMapZoom);
			self.map.panTo(self.initialAddress);
		}

		this.setRoute = function(startPosition, endPosition) {
			var request = {
				origin: startPosition.join(','),
				destination: endPosition.join(','),
				travelMode: google.maps.TravelMode.WALKING
			};

			self.directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					self.directionsDisplay.setDirections(response);
					self.directionsDisplay.setMap(self.map);
				}

				//self.hideBikeRacksOutOfRoute(startPosition, endPosition);
			});
		};

		this.displayAllBikeRacks = function() {
			for (var index in self.bikeRacks) {
				self.bikeRacks[index].setMap(self.map);
			}
		};

		this.hideBikeRacksOutOfRoute = function(startPosition, endPosition) {
			for (var index in self.bikeRacks) {
				var bikeRack = self.bikeRacks[index];

				if (self.isSameCoordinate(bikeRack.getPosition().lat(), startPosition[0]) && self.isSameCoordinate(bikeRack.getPosition().lng(), startPosition[1])) {
					continue;
				}

				if (self.isSameCoordinate(bikeRack.getPosition().lat(), endPosition[0]) && self.isSameCoordinate(bikeRack.getPosition().lng(), endPosition[1])) {
					continue;
				}

				self.bikeRacks[index].setMap(null);
			}
		};

		this.isSameCoordinate = function(cord1, cord2) {
			return String(cord1).substring(0, 10) == String(cord2).substring(0, 10)
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
			$.each(data, function(index, el) {
				mapController.addBikeRack(el.nome.replace(/\_/g, ' '), el.latitude, el.longitude);
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
		$(window).scrollTop(map-container.offset().top);
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

		resolveNearestAddresses(targetFrom.attr('data-pos'), targetTo.attr('data-pos'));
	}).on('reset', function(e) {
		e.preventDefault();
		mapController.reset();
		targetTo.val('').attr('data-pos', '');
	});

	function resolveNearestAddresses(startPosition, endPosition) {
		$.get('/bikeRack/nearestBikeRack?startPosition=' + startPosition + '&endPosition=' + endPosition, function(data) {
			//console.log('Building route', data);
			mapController.setRoute([data.start.lat, data.start.lng], [data.end.lat, data.end.lng])
		});
	}

	initialize();
});
