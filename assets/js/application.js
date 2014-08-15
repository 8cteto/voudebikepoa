$(function() {
    var targetFrom = $('#targetFrom'),
          targetTo = $('#targetTo'),
          currentPosition = undefined,
          geocoder = new google.maps.Geocoder();

    function initialize() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                currentPosition = position.coords.latitude + ',' + position.coords.longitude;
                findAddresByGeoLocation(targetFrom, position.coords.latitude, position.coords.longitude);
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
        });
    }

    function setNotFoundFromTarget() {
        targetFrom.attr('placeholder', 'Digite o endereço de origem');
    }

    initialize();
});
