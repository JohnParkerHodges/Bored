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

        const chunkedEvents = chunk(3)(events);
        console.log(chunkedEvents)
        $("#mainBody").append(`<div class="row" id="eventsRow"></div>`)

        for (let i = 0; i < chunkedEvents.length; i++) {
            $("#eventsRow").append(`<div class="col-4" id="eventsCol-${i}"></div>`)


            for (let j = 0; j < chunkedEvents[i].length; j++) {
                const event = chunkedEvents[i][j];
                // if the event has an image, use the image for the card; otherwise use a default image
                const imageUrl = event.image && event.image.url || "https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                    // APPEND CARD FOR EVENT
                $(`#eventsCol-${i}`).append(
                        EventCard(
                            (imageUrl),
                            event.title,
                            event.description,
                            `${event.owner}${event.postalcode}`
                        ))
                    // APPEND MODAL FOR EVENT INFO
                $("#mainBody").append(
                        EventModal(
                            `${event.owner}${event.postalcode}`,
                            event.title,
                            event.description
                        ))
                    // add a click handler to the modal "save to favorites" button
                $(`#save${event.owner}${event.postalcode}`).on('click', function() {
                    saveToFavorites(event)
                })
            }
        }


    });
};


function saveToFavorites(event) {
    localStorage.setItem(`neverBoredAppEvent-${event.title}`, JSON.stringify(event))
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

// template for building an event card component
function EventCard(imageUrl, title, description, id) {
    return `
    <!-- Card -->
<div class="card mt-5">

<!-- Card image -->
<img class="card-img-top" src="${imageUrl}" alt="Card image cap">

<!-- Card content -->
<div class="card-body">

<!-- Title -->
<h4 class="card-title"><a>${title}</a></h4>
<!-- Text -->
<p class="card-text">${description}</p>
<!-- Button -->
<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#${id}">More Info</a>

</div>

</div>
<!-- Card -->`
}

// template for building an event modal component
function EventModal(id, title, description) {
    return `
<!-- Modal -->
<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="save${id}">Add to My Favorites</button>
      </div>
    </div>
  </div>
</div>`
}

// FUNCTION FOR SPLITTING ARRAY INTO EVEN CHUNKS
const chunk = s => a => (!a.length ? [] : [a.slice(0, s)].concat(chunk(s)(a.slice(s))));