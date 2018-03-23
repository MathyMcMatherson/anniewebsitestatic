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


function eventHandlers() {
  let btnDOM;
  for(let loc in LOCATIONS) {
    btnDOM = document.querySelector("#" + loc + "Btn");
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
  btnDOM = document.querySelector("#directionsBtn");
  btnDOM.addEventListener('click', (e) => {
      findDirections();
  });
}

function findDirections() {

  /*Stolen from: https://developers.google.com/maps/documentation/javascript/geolocation */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //success
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      if(curMarker == null) {
        alert("Error - pick a place to take me for a walk first!");
      } else {
          calculateAndDisplayRoute(pos, curMarker.getPosition());
      }

    }, function() {
      //error
      alert("Error - don't have permission to access your location");
    });
  } else {
    // Browser doesn't support Geolocation
    alert("Error - your browser doesn't support looking at your location");
  }
}

/*Stolen from: https://developers.google.com/maps/documentation/javascript/examples/directions-simple */
function calculateAndDisplayRoute(start, end) {
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      //console.log(response.routes[0].legs[0].duration.text);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

$(document).ready(function() {
  eventHandlers();
});
