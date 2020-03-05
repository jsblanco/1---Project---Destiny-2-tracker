const loginNavbar = document.getElementById("nav-login")
const registerNavbar = document.getElementById("nav-register")
const userNavbar = document.getElementById("nav-username")
const logoffNavbar = document.getElementById("nav-logoff")
const searchInput = document.getElementById("search-input")


function checkLoggedUser(){
    if (localStorage.loggedUser){
    updateNavbar()
    } else {logOff()}
}

function logOff(){
    localStorage.removeItem("loggedUser")
    localStorage.removeItem("favMembershipId")
    localStorage.removeItem("favMembershipType")
    userNavbar.classList.add("d-none")
    logoffNavbar.classList.add("d-none")
    loginNavbar.classList.remove("d-none")
    registerNavbar.classList.remove("d-none")
}

function updateNavbar() {
    loginNavbar.classList.add("d-none")
    registerNavbar.classList.add("d-none")
    userNavbar.innerHTML= `<a class="nav-link px3 text-light" href="favourite.html"><b>${localStorage.loggedUser}</b></a>`
    userNavbar.classList.remove("d-none")
    logoffNavbar.classList.remove("d-none")
}

function successfullLogin(email){ 
    userDb.forEach(user => {
        if (user.email === email) {
            localStorage.setItem("loggedUser", user.username)
        }
    })
}


logoffNavbar.onclick = () => logOff()

function storeSearchInput(){
    localStorage.setItem("userInput", searchInput.value)
}

searchInput.addEventListener("change", storeSearchInput)

searchInput.value = localStorage.userInput? localStorage.userInput : ""

checkLoggedUser()


