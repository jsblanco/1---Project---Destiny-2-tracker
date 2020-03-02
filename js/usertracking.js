const loginNavbar = document.getElementById("nav-login")
const registerNavbar = document.getElementById("nav-register")
const userNavbar = document.getElementById("nav-username")
const logoffNavbar = document.getElementById("nav-logoff")


function checkLoggedUser(){
    if (localStorage.loggedUser){
    updateNavbar()
    } 
}

function logOff(){
    localStorage.removeItem("loggedUser")
}

function updateNavbar() {
    loginNavbar.classList.add("d-none")
    registerNavbar.classList.add("d-none")
    userNavbar.innerHTML= `<b>${localStorage.loggedUser}</b>    <i>¿No eres tú?</i>`
    userNavbar.classList.remove("d-none")
}

function checkUsername(email){
    let user= localStorage.getItem("email", email)
    localStorage.setItem("loggedUser", user.username)
}



/*
let userExists = false;
if (!userDb) {
    return false;
} else {
    userDb.forEach(user => {
        if (user.email === this.email) {
            return user
        }
    })
}
return userExists;

}*/