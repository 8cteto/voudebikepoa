$(function() {

	var 	targetFrom = $('#targetFrom'),
		targetTo = $('#targetTo'),
		inputForm = $('#map-input-form'),
		directionsDisplay,
		map,
		directionsService = new google.maps.DirectionsService(),
		geocoder = new google.maps.Geocoder();

	$().add(targetFrom).add(targetTo).on('change', function(e) {
		$(this).attr('data-pos', '');
	});

	function initialize() {
		initializeMap();
		verifyCurrentLocation();
		loadBikeRacks();
	}

	function initializeMap() {
		var isDraggable = $(document).width() > 480 ? true : false;
		var portoAlegre = new google.maps.LatLng(-30.0159,-51.1348);

		var mapOptions = {
			zoom:12,
			center: portoAlegre,
			scrollwheel:false,
			draggable:isDraggable
		};

		map = new google.maps.Map($('#map-canvas')[0], mapOptions);

		directionsDisplay = new google.maps.DirectionsRenderer();

		directionsDisplay.setMap(map);
	}

	function verifyCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				findAddresByGeoLocation(targetFrom, position.coords.latitude, position.coords.longitude);
				markCurrentPositionOnMap(position);
			});
		} else {
			setNotFoundFromTarget();
		}
	}

	function loadBikeRacks() {
		$.getJSON('/bikeRack/all', function(data) {
			$.each(data, function(index, el) {
				markPoint(el.latitude, el.longitude, el.nome);
			});
		});
	}

	function findAddresByGeoLocation(targetElement, lat, lng) {
		var latlng = new google.maps.LatLng(lat, lng);
		
		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status != google.maps.GeocoderStatus.OK) {
				setNotFoundFromTarget();
				return;
			}
			targetFrom.val(results[0].formatted_address).attr('data-pos', joinPosition(lat, lng));
			inputForm.trigger('address-resolved');
		});
	}

	function joinPosition(lat, lng) {
		return lat + ',' + lng;
	}

	function splitPosition(position) {
		return position.split(',');
	}

	function findGeoLocationByAddress(targetElement) {
		var address = targetElement.val() + ', Porto Alegre, RS, Brasil';

		geocoder.geocode( { 'address': address } , function(results, status) {
			if (status != google.maps.GeocoderStatus.OK) 
				return;

			var result = results[0];

			var position = joinPosition(result.geometry.location.lat(), result.geometry.location.lng());
			targetElement.val(result.formatted_address).attr('data-pos', position);
			inputForm.trigger('address-resolved');
		});
	}

	function setNotFoundFromTarget() {
		targetFrom.attr('placeholder', 'Digite o endereço de origem');
	}

	function markCurrentPositionOnMap(position){
		var initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		marcadorPraca = new google.maps.Marker({
			position: initialLocation,
			map: map,
			title:"Meu Local",
		});
	}

	function createRoute(startPoint, endPoint) {
		var request = {
			origin: startPoint,
			destination: endPoint,
			travelMode: google.maps.TravelMode.WALKING
		};

		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});

		focusMap();
	}

	function markPoint(latitude,longitude, nameMarker) {
		var nameMarker = nameMarker.replace(new RegExp('_', 'g'),' ');
		var newMarker = new google.maps.LatLng(latitude, longitude);
		new google.maps.Marker({
			title: nameMarker,
			position: newMarker,
			map: map,
			icon:"/images/icone-estacoes.gif",
		}); 
	}

	function focusMap() {
		$(window).scrollTop($('.map-container').offset().top);
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

		if (!hasAddress(targetFrom))
			alert('Informe o local de origem!');

		if (!hasAddress(targetTo))
			alert('Informe o local de destino!');

		if (!addressAlreadyResolved(targetFrom))
			findGeoLocationByAddress(targetFrom);

		if (!addressAlreadyResolved(targetTo))
			findGeoLocationByAddress(targetTo);

	}).on('address-resolved', function() {
		if (!hasAddress(targetFrom) || !hasAddress(targetTo) || !addressAlreadyResolved(targetFrom) || !addressAlreadyResolved(targetTo))
			return;

		resolveNearestAddresses(targetFrom.attr('data-pos'), targetTo.attr('data-pos'));
	});

	function resolveNearestAddresses(startPosition, endPosition) {
		$.get('/bikeRack/nearestBikeRack?startPosition=' + startPosition + '&endPosition=' + endPosition, function(data) {
			//console.log('Building route', data);
			createRoute(joinPosition(data.start.lat, data.start.lng), joinPosition(data.end.lat, data.end.lng))
		});
	}

	initialize();
});
