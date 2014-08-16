var targetFrom = $('#targetFrom'),
      targetTo = $('#targetTo'),
      currentPosition = undefined,
      directionsDisplay,
      map,
      directionsService = new google.maps.DirectionsService(),
      geocoder = new google.maps.Geocoder();

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var portoAlegre = new google.maps.LatLng(-30.0159,-51.1348);

    var mapOptions = {
        zoom:12,
        center: portoAlegre,
        scrollwheel:false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            currentPosition = position.coords.latitude + ',' + position.coords.longitude;
            findAddresByGeoLocation(targetFrom, position.coords.latitude, position.coords.longitude);
            markCurrentPositionOnMap(position);
        });
    } else {
        setNotFoundFromTarget();
    }
}

$('#routeButton').on('click', function() {
    findGeoLocationByAddress(targetTo);
});

function findAddresByGeoLocation(targetElement, lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status != google.maps.GeocoderStatus.OK) {
            setNotFoundFromTarget();
            return;
        }
        targetFrom.val(results[1].formatted_address);
    });
}

function findGeoLocationByAddress(targetElement) {
    var latlng = new google.maps.LatLng(currentPosition.split(','));
    var address = targetElement.val() + ', Porto Alegre, RS, Brasil';

    geocoder.geocode( { 'address': address, 'latLng': latlng} , function(results, status) {
        if (status != google.maps.GeocoderStatus.OK) 
            return;

        targetElement.val(results[0].formatted_address);
        var destinationPosition = results[0].geometry.location.lat() + ',' + results[0].geometry.location.lng();

        createRoute(currentPosition, destinationPosition);
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
    var newMarker = new google.maps.LatLng(latitude,longitude);
    new google.maps.Marker({
        position: newMarker,
        map: map,
        title: nameMarker,
        icon:"/images/icone-estacoes.gif",
    }); 
}

function focusMap() {
    $(window).scrollTop($('.map-container').offset().top);
}

google.maps.event.addDomListener(window, 'load', initialize);
