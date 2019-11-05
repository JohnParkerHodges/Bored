// simple code that gets the user's location and gives a console log if permission is denied
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, function () { console.log('Permission Denied'); })
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude)
}