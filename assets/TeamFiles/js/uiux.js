$(document).ready(function() {
    checkUserAuth();
    setThemeOnLogin();

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
    if (!JSON.parse(localStorage.getItem('neverBoredApp-LoggedIn')).isLoggedIn) {
        window.location.replace('./landingPage.html');
    }
}

function userLogOut() {
    localStorage.setItem('neverBoredApp-LoggedIn', JSON.stringify({
        isLoggedIn: false,
        userName: null
    }))
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


/*

1. change object being stored for neverBoredApp-LoggedIn
 - needs to be an object instead of a string of true or false
 - needs keys of:
   - isLoggedIn: boolean (true/false)
   - userName: string (user email from form that gets set whenever a user logs in)
 - this will be stringified then put into local storage
- change all references where this is checked for auth
  - log in / sign up forms
  - auth function
  - they are currently checking local storage for a string; they need to parse the new object from local storage and then check the isLoggedIn key for a bool (true/false)
- ensure that this is getting set every time a user logs in
  - need to set the isLoggedIn as true
  - need to set the userName as the new user's email (the one who just logged in)

2. set up your functions to check the new user object in local storage for the key of theme
 - we are already using this new object
 - need click handlers on the different theme colors (buttons or a form)
 - on click, run the function to grab the current logged in user from local storage (see #1)
 - using that information, LOOK UP that user in local storage
 - parse that so you have a user object instead of a string
 - set the theme key of the object (user.theme = THEME)
 - save that back into local storage (make sure to JSON.stringify())

3. make sure to change the strings for theme to whatever MDB says
  - the class names currently just say 'whiteTheme'; they will need to match the proper MDB documentation

4. lastly: make sure to set the body class whenever a user logs in
  - in your log in and sign up functions, add a function that just gets the user out of local storage, parses that string, grabs the theme, then sets the body class to whatever it is
  - this is called _persistence_; that just means that whatever a user saved into your "database" stays there and you keep that value later on
  - this way they don't have to change it every time they log in; the page "remembers" that info, and _persists_ it

*/