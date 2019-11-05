function searchClick(search){
    const queryURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    jQuery.ajaxPrefilter((options)=>{
        if(options.crossDomain && jQuery.support.cors){
            options.url = 'http://uncc-cors-proxy.herokuapp.com/' + options.url;
        }
    })
    $.ajax({
        url: queryURL,
        type: 'GET',
        data: {

        key: 'AIzaSyCv5uQi2QbNb8fUazsnU65atd6sysz9qCE',
        inputtype: 'textquery',
        input: search,
        fields: 'photos,formatted_address,name,rating,opening_hours,geometry/location', 
        }
    }).then(function(response){
        console.log(response)

    })
}
$('#zip').click(function () {
    var search = $('#zipcode').val()
    const queryURL = "https://maps.googleapis.com/maps/api/geocode/json"
    jQuery.ajaxPrefilter((options)=>{
        if(options.crossDomain && jQuery.support.cors){
            options.url = 'http://uncc-cors-proxy.herokuapp.com/' + options.url;
        }
    })
    $.ajax({
        url: queryURL,
        type: 'GET',
        data: {

        key: 'AIzaSyCv5uQi2QbNb8fUazsnU65atd6sysz9qCE',
        address: search,
        }
    }).then(function(response){
        console.log(response)

    })
});