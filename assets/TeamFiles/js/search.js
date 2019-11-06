$("#clickSearch").on("click", function() {
  const zip = $("#searchZip").val();
  console.log(zip);

  const queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?postalCode=" +
    zip +
    "&startDate=today&radius=10000&apikey=lprFuKAwJA99Ym3lTZLv5pQKagAMlWVT";
  console.log(zip);

  jQuery.ajaxPrefilter(options => {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
    }
  });

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //window.location.replace('./Main.html');
    console.log(response);
    
    const events = response._embedded.events;
    $("#mainBody").empty();

    const chunkedEvents = chunk(3)(events);
    $("#mainBody").append(`<div class ="row" id="eventsRow"></div>`);

    for (let i = 0; i < chunkedEvents.length; i++) {
      $("#eventsRow").append(`<div class="col-4" id="eventsCol-${i}"></div>`);

      for (let j = 0; j < chunkedEvents[i].length; j++) {
        const event = chunkedEvents[i][j];
        const imageUrl = response._embedded.events[i].images[2].url;
        $(`#eventsCol-${i}`).append(
          EventCardTwo(
            imageUrl,
            event.name,
            event.info,
            `${event.owner}${event.postalcode}`
          )
        );
        // APPEND MODAL FOR EVENT INFO
        $("#mainBody").append(
          EventModalTwo(
            `${event.owner}${event.postalcode}`,
            event.name,
            event.info
          )
        );
      }
    }
    
  });
  
});

function EventCardTwo(imageUrl, name, info, id) {
    return `
      <!-- Card -->
  <div class="card mt-5">
  
  <!-- Card image -->
  <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
  
  <!-- Card content -->
  <div class="card-body">
  
  <!-- Title -->
  <h4 class="card-title"><a>${name}</a></h4>
  <!-- Text -->
  <p class="card-text">${info}</p>
  <!-- Button -->
  <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#${id}">More Info</a>
  
  </div>
  
  </div>
  <!-- Card -->`;
  }
  
  // template for building an event modal component
  function EventModalTwo(id, name, info) {
    return `
  <!-- Modal -->
  <div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ${info}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="save${id}">Add to My Favorites</button>
        </div>
      </div>
    </div>
  </div>`;
  }
  

  
