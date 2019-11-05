const user = {
    firstName: "Parker",
    lastName: "Hodges",
    email: "phodgesfl@gmail.com",
    password: "IloveStevieHeIsTheBest",
    theme: "black",
    picture: "https://google.com/einstein"
}

const userForLocalStorage = JSON.stringify(user);

userForLocalStorage //?

const userFromLocalStorage = JSON.parse(userForLocalStorage);

userFromLocalStorage //?

userFromLocalStorage.theme = "green";

const backToLocalStorage = JSON.stringify(userFromLocalStorage)

backToLocalStorage //?

const getItBackAgain = JSON.parse(backToLocalStorage) //?