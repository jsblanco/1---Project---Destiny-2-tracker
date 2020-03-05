const loginNavbar = document.getElementById("nav-login")
const registerNavbar = document.getElementById("nav-register")
const userNavbar = document.getElementById("nav-username")
const logoffNavbar = document.getElementById("nav-logoff")
const searchInput = document.getElementById("search-input")


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
    userNavbar.innerHTML= `<b>${localStorage.loggedUser}</b>   <br> <i>¿No eres tú?</i>`
    userNavbar.classList.remove("d-none")
}

function successfullLogin(email){ 
    userDb.forEach(user => {
        if (user.email === email) {
            localStorage.setItem("loggedUser", user.username)
        }
    })
}


userNavbar.onclick = () => logOff()

function storeSearchInput(){
    localStorage.setItem("userInput", searchInput.value)
}

searchInput.addEventListener("change", storeSearchInput)

searchInput.value = localStorage.userInput? localStorage.userInput : ""

checkLoggedUser()


