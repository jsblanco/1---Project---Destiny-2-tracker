const searchSteam = document.getElementById("platform-steam")
const searchPlaystation = document.getElementById("platform-playstation")
const searchXbox = document.getElementById("platform-xbox")
const searchInput = document.getElementById("username-input")


const name= document.getElementById("name-input")
const username= document.getElementById("username-input")
const password= document.getElementById("password-input")
const passwordCheck= document.getElementById("password-check")
const email= document.getElementById("email-input")


const loginButton = document.getElementById("login-button")

loginButton.onclick = () => {
    event.preventDefault()
    deleteErrors();
    if (isUserRegistered()===true) {}
}

function isUserRegistered(){
    
    let LoginValidator = new loginValidator(username, password)
    let userDb = JSON.parse(localStorage.getItem("users"));
    let validUser = true;

    if(!LoginValidator.checkName()){
        LoginValidator.errorCreator("Este usuario no está registrado en la plataforma. Por favor, regístrate.")
        validUser=false
    }
    return validUser
}

function deleteErrors (){
    let errors = [...document.getElementsByClassName("error")]
    errors ? errors.forEach(error => error.remove()) : null;
}