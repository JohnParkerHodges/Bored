new WOW().init();

$("#userSignUpButton").on('click', function() {
    const formUserName = $("#userSignUpEmail").val();
    const formUserPassword = $("#userSignUpPassword").val();

    if (localStorage.getItem(`neverBoredApp-User-${formUserName}`)) {
        localStorage.setItem('neverBoredApp-LoggedIn', false)
        SignUpUserAlreadyExistsAlert();
    } else {
        localStorage.setItem(`neverBoredApp-User-${formUserName}`, formUserPassword);
        localStorage.setItem('neverBoredApp-LoggedIn', true)
        window.location.replace('./Main.html');
    }
});

$("#userLogInButton").on('click', function() {
    const formUserName = $("#userLogInEmail").val();
    const formUserPassword = $("#userLogInPassword").val();

    const userPassFromLocalStorage = localStorage.getItem(`neverBoredApp-User-${formUserName}`)

    if (!userPassFromLocalStorage) {
        localStorage.setItem('neverBoredApp-LoggedIn', false)
        LogInValidationAlert();
    } else {
        if (userPassFromLocalStorage !== formUserPassword) {
            localStorage.setItem('neverBoredApp-LoggedIn', false)
            LogInValidationAlert();
        } else if (userPassFromLocalStorage === formUserPassword) {
            localStorage.setItem('neverBoredApp-LoggedIn', true)
            window.location.replace('./Main.html');
        }
    }
})


function SignUpUserAlreadyExistsAlert() {
    $("#userSignInForm").append(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Holy guacamole!</strong> You already have an account. Click "Log in" to log in.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                    </div>`)
}

function LogInValidationAlert() {
    $("#userLogInForm").append(`
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>Holy guacamole!</strong> User name or password is incorrect.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                        </div>`)
}