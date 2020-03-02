const searchSteam = document.getElementById("platform-steam")
const searchPlaystation = document.getElementById("platform-playstation")
const searchXbox = document.getElementById("platform-xbox")
const searchInput = document.getElementById("username-field")
const navBar = document.getElementById("navbar-nav")


let name= document.getElementById("name-field")
let username= document.getElementById("username-field")
let password= document.getElementById("password-field")
let passwordCheck= document.getElementById("password-check")
let email= document.getElementById("email-field")

let errorList=document.getElementById("error-list")
let userDb = JSON.parse(localStorage.getItem('users'))
const form = document.getElementById("form")
const statusMessage = document.getElementById("status-message")


const registerButton = document.getElementById("register-button")


registerButton.onclick = () => {
    event.preventDefault()
    deleteErrors();
    if (isUserValid()) {
        createNewUser(name.value, username.value, password.value, email.value)
        welcomeMessage()
        localStorage.setItem("loggedUser", username.value)
        updateNavbar()
    }
}


function welcomeMessage() {
    statusMessage.innerHTML = "Bienvenido a Destiny 2 Tracker"
    let welcomeMessage = document.createElement("h5")
    welcomeMessage.setAttribute("class", "text-center font-weight-bold mt-4")
    welcomeMessage.innerHTML = "Ya puedes buscar tus personajes de Destiny 2"
    form.innerText = ""
    form.appendChild(welcomeMessage)
}


function isUserValid(){
    
    let signUpValidation = new signUpValidator(password.value, email.value, name.value, username.value, passwordCheck.value)

    console.log(signUpValidation)
    let validUser = true;

    if(!signUpValidation.checkName()){
        signUpValidation.errorCreator("Por favor, introduce un nombre válido")
        validUser=false
    }

    if(!signUpValidation.checkUserName()){
        signUpValidation.errorCreator("Por favor, introduce un nombre de usuario válido")
        validUser=false
    }
   
    
    if(!signUpValidation.checkPassword()){
        signUpValidation.errorCreator("Por favor, introduce una contraseña válida")
        validUser=false
    }

    if(!signUpValidation.checkRepeatedPassword()){
        signUpValidation.errorCreator("Por favor, asegúrate de que ambas contraseñas son iguales")
        validUser=false
    }
    
    if(!signUpValidation.checkEmail()){
        signUpValidation.errorCreator("Por favor, introduce un correo electrónico válido")
        validUser=false
    }
     if(!signUpValidation.isTheUserInTheDb(userDb)){
        signUpValidation.errorCreator("Este correo ya está registrado, prueba a hacer Login")
        validUser=false
    } 
    return validUser
}


function createNewUser (name, username, password, email) {
    const newUser = new User (name, username, password, email)
    userDb? userDb.push(newUser) :  userDb = [newUser]
    localStorage.setItem('users', JSON.stringify(userDb));
} 


function deleteErrors (){
    let errors = [...document.getElementsByClassName("error")]
    errors ? errors.forEach(error => error.remove()) : null;
}
