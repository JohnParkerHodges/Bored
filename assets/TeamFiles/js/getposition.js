function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}

function showPosition(position) {
  alert("Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude)
}