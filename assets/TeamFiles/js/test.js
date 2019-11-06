$("#musicTwo").on("click", function(e) {

    //code using format in the apis.js
    /*const queryURL =
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
  
        const chunkedEvents = chunk(Math.ceil(events.length) / 4)(events);
        console.log(chunkedEvents);
        $("#mainBody").append(`<div class="row" id="eventsRow"></div>`);
  
        for (let i = 0; i < chunkedEvents.length; i++) {
          $("#eventsRow").append(`<div class="col-4" id="eventsCol-${i}"></div>`);
  
          for (let j = 0; j < chunkedEvents[i].length; j++) {
            const event = chunkedEvents[i][j];
            // if the event has an image, use the image for the card; otherwise use a default image
            const imageUrl =
              (event.image && event.image.url) ||
              "https://mdbootstrap.com/img/Photos/Others/images/43.jpg";
            // APPEND CARD FOR EVENT
            $(`#eventsCol-${i}`).append(
              EventCard(
                imageUrl,
                event.title,
                event.description,
                `${event.owner}${event.postalcode}`
              )
            );
            // APPEND MODAL FOR EVENT INFO
            $("#mainBody").append(
              EventModal(
                `${event.owner}${event.postalcode}`,
                event.title,
                event.description
              )
            );
            // add a click handler to the modal "save to favorites" button
            $(`#save${event.owner}${event.postalcode}`).on("click", function() {
              saveToFavorites(event);
            });
          }
        }
      });*/

    const keyWord = "music";
    const queryURL =
        "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" +
        keyWord +
        "&city=charlotte&startDate=today&apikey=lprFuKAwJA99Ym3lTZLv5pQKagAMlWVT";

    jQuery.ajaxPrefilter(options => {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = "http://uncc-cors-proxy.herokuapp.com/" + options.url;
        }
    });

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //const events = response._embedded.events;
        $("#mainBody").empty();

        for (var i = 0; i < response._embedded.events.length; i++) {
            const name = $('<h1>').text(response._embedded.events[i].name)
            const info = $('<h1>').text(response._embedded.events[i].info)
            const newImage = $("<img>").attr("src", response._embedded.events[i].images[2].url)
            $("#mainBody").append(name, info, newImage)
        }


    });
});