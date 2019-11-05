$(document).ready(function() {
    checkUserAuth();

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
                console.log(event)

                $("#userFavorites").append(`<p><a href="${event.url}" target="_blank">${event.title}</a></p>`);
            }


        }

    })
})

function checkUserAuth() {
    if (localStorage.getItem('neverBoredApp-LoggedIn') === "false") {
        window.location.replace('./landingPage.html');
    }
}

function userLogOut() {
    localStorage.setItem('neverBoredApp-LoggedIn', false)
    window.location.replace('./landingPage.html');
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

// function to add theme to body
function whiteTheme() {
    removeThemes();
    $(body).addClass('whiteTheme')
}

function cyanTheme() {
    removeThemes();
    $(body).addClass('cyanTheme')
}

function defaultTheme() {
    removeThemes();
    $(body).addClass('defaultTheme')
}

function purpleTheme() {
    removeThemes();
    $(body).addClass('purpleTheme')
}

function navyblueTheme() {
    removeThemes();
    $(body).addClass('navyblueTheme')
}

function pinkTheme() {
    removeThemes();
    $(body).addClass('pinkTheme')
}

function indigoTheme() {
    removeThemes();
    $(body).addClass('indigoTheme')
}

function lightblueTheme() {
    removeThemes();
    $(body).addClass('lightblueTheme')
}

function greyTheme() {
    removeThemes();
    $(body).addClass('greyTheme')
}

function blackTheme() {
    removeThemes();
    $(body).addClass('blackTheme')
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



$("#whiteThemeButton").on('click', whiteTheme);
$("#blackThemeButton").on('click', blackTheme);
$("#cyanThemeButton").on('click', cyanTheme);
$("#defaultButton").on('click', defaultTheme);
$("#purpleThemeButton").on('click', purpleTheme);
$("#navyblueThemeButton").on('click', navyblueTheme);
$("#pinkThemeButton").on('click', pinkTheme);
$("#indigoThemeButton").on('click', indigoTheme);
$("#lightblueThemeButton").on('click', lightblueTheme);
$("#greyThemeButton").on('click', greyTheme);





function changeUserTheme(newTheme) {
    const currentLoggedInUserName = JSON.parse(localStorage.getItem(`neverBoredApp-LoggedIn`)).userName;
    const user = JSON.parse(localStorage.getItem(`neverBoredApp-User-${currentLoggedInUserName}`));

    user.theme = newTheme;

    localStorage.setItem(`neverBoredApp-User-${currentLoggedInUserName}`, JSON.stringify(user))
}


function setThemeOnLogin() {
    const currentLoggedInUserName = JSON.parse(localStorage.getItem(`neverBoredApp-LoggedIn`)).userName;
    const userTheme = JSON.parse(localStorage.getItem(`neverBoredApp-User-${currentLoggedInUserName}`)).theme;

    console.log(currentLoggedInUserName)
    console.log(userTheme)
    userTheme && $("body").addClass(userTheme)
}