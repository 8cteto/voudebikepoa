$(function() {
    var targetFrom = $('#targetFrom'),
          geocoder = new google.maps.Geocoder();


    function initialize() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                findGeoLocation(targetFrom, position.coords.latitude, position.coords.longitude);
            });
        } else {
            setNotFoundFromTarget();
        }
    }

    function findGeoLocation(targetElement, lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        
        geocoder.geocode({'latLng': latlng}, function(results, status) {
            if (status != google.maps.GeocoderStatus.OK) {
                setNotFoundFromTarget();
                return;
            }

            if (results[1]) {
                targetFrom.val(results[1].formatted_address);
            } else {
                setNotFoundFromTarget();
            }
        });
    }

    function setNotFoundFromTarget() {
        targetFrom.attr('placeholder', 'Digite o endereço de origem');
    }

    initialize();
});
