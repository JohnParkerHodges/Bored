function getCarsEvents(e) {
    const keyWord = "cars";
    const queryURL =
        "https://api.eventful.com/json/events/search?app_key=hRDPbW8GBDtjwWC4&keywords=" +
        keyWord +
        "&location=charlotte&date=Future";

    jQuery.ajaxPrefilter(options => {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
        }
    });
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        const events = JSON.parse(response).events.event;
        $("#mainBody").empty();

        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            console.log(event)
            const image = event.image
                // APPEND CARD FOR EVENT
            $("#mainBody").append(`
            <!-- Card -->
<div class="card">

  <!-- Card image -->
  <img class="card-img-top" src="${event.image && event.image.url || "https://mdbootstrap.com/img/Photos/Others/images/43.jpg"}" alt="Card image cap">

  <!-- Card content -->
  <div class="card-body">

    <!-- Title -->
    <h4 class="card-title"><a>${event.title}</a></h4>
    <!-- Text -->
    <p class="card-text">${event.description}</p>
    <!-- Button -->
    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#${event.owner}${event.postalcode}">More Info</a>

  </div>

</div>
<!-- Card -->`)
                // APPEND MODAL FOR EVENT INFO
            $("#mainBody").append(`
<!-- Modal -->
<div class="modal fade" id="${event.owner}${event.postalcode}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${event.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${event.description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="save${event.owner}${event.postalcode}">Add to My Favorites</button>
      </div>
    </div>
  </div>
</div>`)
            $(`#save${event.owner}${event.postalcode}`).on('click', function() {
                saveToFavorites(event)
            })



            //$("#main").append()
        }
    });
};


function saveToFavorites(event) {
    localStorage.setItem(`boredAppEvent-${event.title}`, JSON.stringify(event))
}

$("#festival").on("click", function(e) {
    console.log("click")
    const keyWord = $(this).val();
    console.log('keyword', keyWord)
    const queryURL =
        "https://api.eventful.com/json/events/search?app_key=hRDPbW8GBDtjwWC4&keywords=" +
        keyWord +
        "&location=charlotte&date=Future";

    jQuery.ajaxPrefilter(options => {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
        }
    });
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(JSON.parse(response))
        console.log(JSON.parse(response).events.event);

        for (var i = 0; i < JSON.parse(response).events.event.length; i++) {
            const title = $("<h1>").text(JSON.parse(response).events.event[i].title);
            const venue = $("<h1>").text(
                JSON.parse(response).events.event[i].venue_address
            );
            const venueName = $("<h1>").text(
                JSON.parse(response).events.event[i].venue_name
            );
            const description = $("<p>").text(
                JSON.parse(response).events.event[i].description
            );
            $("#main").append(title, venueName, venue, description);
        }
    });
});