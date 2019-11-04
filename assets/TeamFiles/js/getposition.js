function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.")
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude)
}