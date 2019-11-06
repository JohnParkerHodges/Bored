new WOW().init();

$("#userSignUpButton").on('click', function() {
    const formUserName = $("#userSignUpEmail").val();
    const formUserPassword = $("#userSignUpPassword").val();

    if (localStorage.getItem(`neverBoredApp-User-${formUserName}`)) {
        localStorage.setItem('neverBoredApp-LoggedIn', JSON.stringify({
            isLoggedIn: false,
            userName: null
        }))
        SignUpUserAlreadyExistsAlert();
    } else {
        const newUser = {
            email: formUserName,
            password: formUserPassword,
            favorites: [],
        };
        localStorage.setItem(`neverBoredApp-User-${formUserName}`, JSON.stringify(newUser));

        localStorage.setItem('neverBoredApp-LoggedIn', JSON.stringify({
            isLoggedIn: true,
            userName: formUserName
        }));
        LogInRedirect();
    }
});

$("#userLogInButton").on('click', function() {
    const formUserName = $("#userLogInEmail").val();
    const formUserPassword = $("#userLogInPassword").val();

    const userPassFromLocalStorage = JSON.parse(localStorage.getItem(`neverBoredApp-User-${formUserName}`)).password;

    if (!userPassFromLocalStorage) {
        localStorage.setItem('neverBoredApp-LoggedIn', JSON.stringify({
            isLoggedIn: false,
            userName: null
        }));
        LogInValidationAlert();
    } else {
        if (userPassFromLocalStorage !== formUserPassword) {
            localStorage.setItem('neverBoredApp-LoggedIn', JSON.stringify({
                isLoggedIn: false,
                userName: null
            }));
            LogInValidationAlert();
        } else if (userPassFromLocalStorage === formUserPassword) {
            localStorage.setItem('neverBoredApp-LoggedIn', JSON.stringify({
                isLoggedIn: true,
                userName: formUserName
            }));
            LogInRedirect();
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

function LogInRedirect() {
    window.location.replace('./home.html');
}