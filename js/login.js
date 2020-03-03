const searchSteam = document.getElementById("platform-steam")
const searchPlaystation = document.getElementById("platform-playstation")
const searchXbox = document.getElementById("platform-xbox")
const searchInput = document.getElementById("username-input")

const password = document.getElementById("password-field")
const email = document.getElementById("email-field")
const loginButton = document.getElementById("login-button")
const form = document.getElementById("form")
const statusMessage = document.getElementById("status-message")

let errorList = document.getElementById("error-list")
let userDb = JSON.parse(localStorage.getItem('users'))

loginButton.onclick = () => {
    event.preventDefault()
    deleteErrors();
    if (isUserRegistered(password.value, email.value) === true) {
        welcomeMessage()
        successfullLogin(email.value)
        checkLoggedUser()
    }
}


function welcomeMessage() {
    statusMessage.innerHTML = "Bienvenido de vuelta"
    let welcomeMessage = document.createElement("h5")
    welcomeMessage.setAttribute("class", "text-center font-weight-bold")
    welcomeMessage.innerHTML = "Tus personajes están donde los dejaste.<br>¿Te ayudamos a encontrarlos?"
    form.innerText = ""
    form.appendChild(welcomeMessage)
}


function isUserRegistered() {

    let LoginValidator = new loginValidator(password.value, email.value)
    let userDb = JSON.parse(localStorage.getItem("users"));
    let validUser = true;

    if (!LoginValidator.checkPassword()) {
        LoginValidator.errorCreator("Por favor, introduce una contraseña válida")
        validUser = false
    }

    if (!LoginValidator.checkEmail()) {
        LoginValidator.errorCreator("Por favor, introduce un correo electrónico válido")
        validUser = false
    }

    if (!LoginValidator.isTheUserInTheDb()) {
        LoginValidator.errorCreator("Este usuario no está registrado en la plataforma. Por favor, regístrate.")
        validUser = false
    }

    return validUser
}

function deleteErrors() {
    let errors = [...document.getElementsByClassName("error")]
    errors ? errors.forEach(error => error.remove()) : null;
}