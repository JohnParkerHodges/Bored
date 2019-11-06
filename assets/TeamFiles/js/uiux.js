$(document).ready(function() {
    checkUserAuth();
    setThemeOnLogin();
    buildFavorites();

    // SideNav Button Initialization
    $(".button-collapse").sideNav();
    // SideNav Scrollbar Initialization
    var sideNavScrollbar = document.querySelector('.custom-scrollbar');
    //var ps = new PerfectScrollbar(sideNavScrollbar);


    $("#seeCarsEvents").on('click', function() {
        $(".eventCard").hide();
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
        getCarsEvents();
    })

    $("#userAccount").on('click', function() {
        $("#userFavorites").empty();
        $("#userFavorites").append("<h4>Favorites:</h4>")

        for (let i = 0; i < localStorage.length; i++) {

            const localStorageKey = localStorage.key(i);
            if (localStorageKey.includes("neverBoredAppEvent")) {
                const event = JSON.parse(localStorage.getItem(localStorageKey));

                $("#userFavorites").append(`<p><a href="${event.url}" target="_blank">${event.title}</a></p>`);
            }


        }

    })
})

function checkUserAuth() {
    if (!JSON.parse(localStorage.getItem('neverBoredApp-LoggedIn')).isLoggedIn) {
        window.location.replace('./index.html');
    }
}

function userLogOut() {
    localStorage.setItem('neverBoredApp-LoggedIn', JSON.stringify({
        isLoggedIn: false,
        userName: null
    }))
    window.location.replace('./index.html');
}

// Themes
function removeThemes() {
    // jquery syntax?
    $("body").removeClass('white-skin')
    $("body").removeClass('cyan-skin')
    $("body").removeClass('mdb-skin')
    $("body").removeClass('deep-purple-skin')
    $("body").removeClass('navy-blue-skin')
    $("body").removeClass('pink-skin')
    $("body").removeClass('indigo-skin')
    $("body").removeClass('light-blue-skin')
    $("body").removeClass('grey-skin')
    $("body").removeClass('black-skin')
}

// adding click handler to each skin
$("#blackTheme").on('click', function() {
    removeThemes();
    $("body").addClass('black-skin')
    changeUserTheme('black-skin')
})
$("#cyanTheme").on('click', function() {
    removeThemes();
    $("body").addClass('cyan-skin')
    changeUserTheme('cyan-skin')
})
$("#defaultTheme").on('click', function() {
    removeThemes();
    $("body").addClass('default-skin')
    changeUserTheme('default-skin')
})
$("#purpleTheme").on('click', function() {
    removeThemes();
    $("body").addClass('deep-purple-skin')
    changeUserTheme('deep-purple-skin')
})
$("#navyblueTheme").on('click', function() {
    removeThemes();
    $("body").addClass('navy-blue-skin')
    changeUserTheme('navy-blue-skin')
})
$("#pinkTheme").on('click', function() {
    removeThemes();
    $("body").addClass('pink-skin')
    changeUserTheme('pink-skin')
})
$("#indigoTheme").on('click', function() {
    removeThemes();
    $("body").addClass('indigo-skin')
    changeUserTheme('indigo-skin')
})
$("#lightblueTheme").on('click', function() {
    removeThemes();
    $("body").addClass('light-blue-skin')
    changeUserTheme('light-blue-skin')
})
$("#whiteTheme").on('click', function() {
    removeThemes();
    $("body").addClass('white-skin')
    changeUserTheme('white-skin')
})
$("#greyTheme").on('click', function() {
    removeThemes();
    $("body").addClass('grey-skin')
    changeUserTheme('grey-skin')
})

function changeUserTheme(newTheme) {
    const currentLoggedInUserName = JSON.parse(localStorage.getItem(`neverBoredApp-LoggedIn`)).userName;
    const user = JSON.parse(localStorage.getItem(`neverBoredApp-User-${currentLoggedInUserName}`));

    user.theme = newTheme;

    localStorage.setItem(`neverBoredApp-User-${currentLoggedInUserName}`, JSON.stringify(user))
}

function setThemeOnLogin() {
    const currentLoggedInUserName = JSON.parse(localStorage.getItem(`neverBoredApp-LoggedIn`)).userName;
    const userTheme = JSON.parse(localStorage.getItem(`neverBoredApp-User-${currentLoggedInUserName}`)).theme;

    userTheme && $("body").addClass(userTheme)
}

function buildFavorites() {
    const favoritesDiv = $("#savedFavorites");
    if (!favoritesDiv[0]) return;

    const currentLoggedInUserName = JSON.parse(localStorage.getItem(`neverBoredApp-LoggedIn`)).userName;
    const userFavorites = JSON.parse(localStorage.getItem(`neverBoredApp-User-${currentLoggedInUserName}`)).favorites;

    if (userFavorites.length < 1) {
        favoritesDiv.append("<p>You haven't saved any favorites! Try beginning by choosing a category from the side pane.</p>")
    } else {
        for (let i = 0; i < userFavorites.length; i++) {
            makeFavoriteElements(userFavorites[i], favoritesDiv)
        }
    }
}

function makeFavoriteElements(favorite, favoritesDiv) {
    let favoriteDashLink;
    let favoriteModal;
    const event = favorite.event;
    console.log(favorite)

    if (favorite.type === "eventful") {
        favoriteDashLink = FavoriteDashLink(event.id.replace(/[!@#\$%\^\&*\)\(+=._-]/g, ""), event.title);
        favoriteModal = FavoriteDashEventfulModal(
            event.id.replace(/[!@#\$%\^\&*\)\(+=._-]/g, ""),
            event.title,
            event.description,
            event.start_time.match(/(\d{4}-\d{2}-\d{2})/g)[0],
            event.image.medium.url);
    } else {
        favoriteDashLink = FavoriteDashLink(event.id, event.name);
        favoriteModal = FavoriteDashTicketMasterModal(
            event.id,
            event.name,
            event.dates.start.localDate,
            event.url,
            event.seatmap.staticUrl,
            event.images[2].url);
    }

    favoritesDiv.append(favoriteDashLink);
    $("#mainBody").append(favoriteModal);
}

function FavoriteDashLink(id, name) {
    return `<li><a href="#" data-toggle="modal" data-target="#${id}">${name}</a></li>`
}

function FavoriteDashTicketMasterModal(id, title, date, ticketUrl, seatingUrl, imageUrl) {
    return `
<!-- Modal -->
<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog z-depth-5" role="document">
    <div class="modal-content p-2">
        <!-- Card -->
        <div class="card mt-5 z-depth-0">
        
        <!-- Card image -->
        <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
        
        <!-- Card content -->
        <div class="card-body whiteCard z-depth-0">
        
        <!-- Title -->
        <h4 class="card-title"><a>${title}</a></h4>
        <!-- Text -->
        <h5>Date: ${date}</h5>
        <!-- Button -->
        <a href="${ticketUrl}" target="_blank" class="btn btn-primary">Buy Tickets</a>
        <a href="${seatingUrl}" target="_blank" class="btn btn-primary">View Seating</a>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
        </div>
        </div>
        <!-- Card -->
    </div>

  </div>
</div>`;
}

function FavoriteDashEventfulModal(id, title, description, date, imageUrl) {
    return `
<!-- Modal -->
<div class="modal fade" id="${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog z-depth-5" role="document">

  <div class="modal-content p-2">
        <!-- Card -->
        <div class="card mt-5 z-depth-0">
        
        <!-- Card image -->
        <img class="card-img-top" src="${imageUrl}" alt="Card image cap">
        
        <!-- Card content -->
        <div class="card-body whiteCard">
        
        <!-- Title -->
        <h4 class="card-title"><a>${title}</a></h4>
        <!-- Text -->
        <h5>Date: ${date}</h5>
        <p class="card-text">${description}</p>
        <!-- Button -->
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        
        </div>
        
        </div>
        <!-- Card -->
    </div>

  </div>
</div>`;
}