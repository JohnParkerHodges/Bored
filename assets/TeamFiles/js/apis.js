function saveToFavorites(event) {
    const currentLoggedInUserName = JSON.parse(localStorage.getItem(`neverBoredApp-LoggedIn`)).userName;
    const user = JSON.parse(localStorage.getItem(`neverBoredApp-User-${currentLoggedInUserName}`));

    user.favorites.push(event);

    localStorage.setItem(`neverBoredApp-User-${currentLoggedInUserName}`, JSON.stringify(user));
}

function makeEventfulClickHandler(divId, searchKeyword) {
    $(`#${divId}`).on("click", function(e) {
        setLoadingSpinner();
        const zipCode = localStorage.getItem('neverBoredApp-zipCode');

        const googleQueryURL = "https://maps.googleapis.com/maps/api/geocode/json"
        jQuery.ajaxPrefilter((options) => {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'http://uncc-cors-proxy.herokuapp.com/' + options.url;
            }
        })
        $.ajax({
            url: googleQueryURL,
            type: 'GET',
            data: {

                key: 'AIzaSyCv5uQi2QbNb8fUazsnU65atd6sysz9qCE',
                address: zipCode,
            }
        }).then(function(response) {
            const location = response.results[0].address_components[1].short_name;
            const keyWord = searchKeyword;
            const queryURL =
                "https://api.eventful.com/json/events/search?app_key=hRDPbW8GBDtjwWC4&keywords=" +
                keyWord +
                "&location=" + location + "&date=Future";

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

                const chunkedEvents = chunk(Math.ceil(events.length) / 4)(events);
                $("#mainBody").append(`<div class="row" id="eventsRow"></div>`);

                console.log(chunkedEvents)

                for (let i = 0; i < chunkedEvents.length; i++) {
                    $("#eventsRow").append(`<div class="col-3" id="eventsCol-${i}"></div>`);

                    for (let j = 0; j < chunkedEvents[i].length; j++) {
                        const event = chunkedEvents[i][j];
                        // if the event has an image, use the image for the card; otherwise use a default image
                        const imageUrl =
                            (event.image && event.image.medium && event.image.medium.url) ||
                            "https://mdbootstrap.com/img/Photos/Others/images/43.jpg";
                        const eventDate = event.start_time.match(/(\d{4}-\d{2}-\d{2})/g)[0]
                            // APPEND CARD FOR EVENT
                        $(`#eventsCol-${i}`).append(
                            EventfulEventCard(
                                imageUrl,
                                event.title,
                                eventDate,
                                event.venue_name,
                                `${event.id.replace(/[!@#\$%\^\&*\)\(+=._-]/g, "")}`
                            )
                        );
                        // APPEND MODAL FOR EVENT INFO
                        $("#mainBody").append(
                            EventfulEventModal(
                                `${event.id.replace(/[!@#\$%\^\&*\)\(+=._-]/g, "")}`,
                                event.title,
                                imageUrl,
                                "",
                                eventDate,
                                event.description
                            )
                        );
                        // add a click handler to the modal "save to favorites" button
                        $(`#save${event.id.replace(/[!@#\$%\^\&*\)\(+=._-]/g, "")}`).on("click", function() {
                            saveToFavorites({
                                type: "eventful",
                                event: event
                            });
                        });
                    }
                }
            });
        })
    });
}

// template for building an event card component
function EventfulEventCard(imageUrl, title, date, location, id) {
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
<p class="card-text">${date}</p>
<p class="card-text">at ${location}</p>
<!-- Button -->
<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#${id}">More Info</a>

</div>

</div>
<!-- Card -->`;
}

// template for building an event modal component
function EventfulEventModal(id, title, imageUrl, ticketUrl, date, description, seatingUrl) {
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
    <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
    <br/>
      <h5>Date: ${date}</h5>
      ${description}
      </div>
      <div class="modal-footer">
      <a href="${ticketUrl}" target="_blank" class="btn btn-primary">Buy Tickets</a>
      ${seatingUrl ? `<a href="${seatingUrl}" target="_blank" class="btn btn-primary">View Seating</a>` : ""}
    <button type="button" class="btn peach-gradient" id="save${id}">Add to My Favorites</button>
    </div>
  </div>
</div>
</div>`;
}



function makeTicketMasterClickHandler(divId, searchKeyword) {
    $(`#${divId}`).on("click", function (e) {
        setLoadingSpinner();
        const zipCode = localStorage.getItem('neverBoredApp-zipCode');

        const queryURL = "https://maps.googleapis.com/maps/api/geocode/json"
        jQuery.ajaxPrefilter((options) => {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'http://uncc-cors-proxy.herokuapp.com/' + options.url;
            }
        })
        $.ajax({
            url: queryURL,
            type: 'GET',
            data: {

                key: 'AIzaSyCv5uQi2QbNb8fUazsnU65atd6sysz9qCE',
                address: zipCode,
            }
        }).then(function (response) {
            const location = response.results[0].address_components[1].short_name;
            const keyWord = searchKeyword;
            const queryURL =
                "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" +
                keyWord +
                "&city=" + location + "&startDate=today&apikey=lprFuKAwJA99Ym3lTZLv5pQKagAMlWVT";

            jQuery.ajaxPrefilter(options => {
                if (options.crossDomain && jQuery.support.cors) {
                    options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
                }
            });

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                const events = response._embedded.events;
                $("#mainBody").empty();

                const chunkedEvents = chunk(Math.ceil(events.length) / 4)(events);
                $("#mainBody").append(`<div class ="row" id="eventsRow"></div>`);

                for (let i = 0; i < chunkedEvents.length; i++) {
                    $("#eventsRow").append(`<div class="col-3" id="eventsCol-${i}"></div>`);

                    for (let j = 0; j < chunkedEvents[i].length; j++) {
                        const event = chunkedEvents[i][j];
                        const imageUrl = event.images[2].url;

                        $(`#eventsCol-${i}`).append(
                            TicketMasterEventCard(
                                imageUrl,
                                event.name,
                                event.url,
                                `${event.id}`
                            )
                        );
                        // APPEND MODAL FOR EVENT INFO
                        const seatingUrl = event.seatmap && event.seatmap.staticUrl || "";
                        $("#mainBody").append(
                            TicketMasterEventModal(
                                `${event.id}`,
                                event.name,
                                event.images[2].url,
                                event.url,
                                event.dates.start.localDate,
                                seatingUrl,
                            )
                        );

                        // add a click handler to the modal "save to favorites" button
                        $(`#save${event.id}`).on("click", function () {
                            saveToFavorites({
                                type: "ticketmaster",
                                event: event
                            });
                        });
                    }
                }
            });
        })
    });
}

// template for building an event card component
function TicketMasterEventCard(imageUrl, title, description, id) {
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
<!-- Card -->`;
}

// template for building an event modal component
function TicketMasterEventModal(id, title, imageUrl, ticketUrl, date, seatingUrl) {
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
    <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
    <br/>
      <h5>Date: ${date}</h5>
      </div>
      <div class="modal-footer">
      <a href="${ticketUrl}" target="_blank" class="btn btn-primary">Buy Tickets</a>
      ${seatingUrl ? `<a href="${seatingUrl}" target="_blank" class="btn btn-primary">View Seating</a>` : ""}
    <button type="button" class="btn peach-gradient" id="save${id}">Add to My Favorites</button>
    </div>
  </div>
</div>
</div>`;
}


makeEventfulClickHandler("movies", "movies")
makeEventfulClickHandler("food", "food")
makeEventfulClickHandler("festival", "festival")

makeTicketMasterClickHandler("play", "play")
makeTicketMasterClickHandler("sport", "sport")
makeTicketMasterClickHandler("musicTwo", "music")


// FUNCTION FOR SPLITTING ARRAY INTO EVEN CHUNKS
const chunk = s => a =>
    !a.length ? [] : [a.slice(0, s)].concat(chunk(s)(a.slice(s)));

function setLoadingSpinner() {
    $("#mainBody").empty();
    $("#mainBody").append(`
    <div class="container-fluid text-center">
    <h1>Loading...</h1>
    <!--Big blue-->
    <div class="preloader-wrapper active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
    </div>`)
}