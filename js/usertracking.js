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

function successfullLogin(email){ 
    userDb.forEach(user => {
        if (user.email === email) {
            console.log(email)
            console.log(user.email)
            console.log(user.username)
            localStorage.setItem("loggedUser", user.username)
            updateNavbar()
        }
    })
}


userNavbar.onclick = () => logOff()

