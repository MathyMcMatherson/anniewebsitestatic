const MAPS_API_KEY = "AIzaSyB-0I6OiHS71DRPUE6FVMlkM9TgmmTFPlc";
let curMarker = null;
let map = null;
let directionsService = null;
let directionsDisplay = null;

const LOCATIONS = {
  'riverPark': {
    lat:32.276990, lng:-110.904667
  },
  'himmel': {
    lat:32.233915, lng:-110.933457
  },
  'uofa': {
    lat:32.231943, lng:-110.945554
  },
  'hopshop': {
    lat:32.266126, lng:-110.913664
  }
}

function initMap() {
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 32.22, lng: -110.93}
  });
  directionsDisplay.setMap(map);
  /*
  for(let key in LOCATIONS) {
    var marker = new google.maps.Marker({
      position: LOCATIONS[key],
      map: map
    });
  }
  */

  /*
  var onChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById('start').addEventListener('change', onChangeHandler);
  document.getElementById('end').addEventListener('change', onChangeHandler);
  */
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: document.getElementById('start').value,
    destination: document.getElementById('end').value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function eventHandlers() {
  for(let loc in LOCATIONS) {
    let btnDOM = document.querySelector("#" + loc + "Btn");
    btnDOM.addEventListener('click', (e) => {
      if(curMarker != null) {
        curMarker.setMap(null);
      }
      curMarker = new google.maps.Marker({
        position: LOCATIONS[loc],
        map: map
      });
      map.setZoom(14);
      map.setCenter(curMarker.getPosition());

    });
  }
}

$(document).ready(function() {
  eventHandlers();
});
