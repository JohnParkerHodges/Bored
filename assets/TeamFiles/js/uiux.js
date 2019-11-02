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
        if (localStorageKey.includes("boredAppEvent")) {
            const event = JSON.parse(localStorage.getItem(localStorageKey));
            console.log(event)

            $("#userFavorites").append(`<p><a href="${event.url}" target="_blank">${event.title}</a></p>`);
        }


    }

})