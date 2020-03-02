const searchSteam = document.getElementById("platform-steam")
const searchPlaystation = document.getElementById("platform-playstation")
const searchXbox = document.getElementById("platform-xbox")
const searchInput = document.getElementById("username-field")

let name= document.getElementById("name-field")
let username= document.getElementById("username-field")
let password= document.getElementById("password-field")
let passwordCheck= document.getElementById("password-check")
let email= document.getElementById("email-field")

let errorList=document.getElementById("error-list")
let userDb = JSON.parse(localStorage.getItem('users'))


const registerButton = document.getElementById("register-button")


registerButton.onclick = () => {
    event.preventDefault()
    deleteErrors();
    if (isUserValid()===true) {
        createNewUser(name.value, name.value, email.value, password.value)}
}



function isUserValid(){
    
    let signUpValidation = new signUpValidator(name.value, username.value, password.value, passwordCheck.value, email.value)
    let validUser = true;

    if(!signUpValidation.checkName()){
        signUpValidation.errorCreator("Por favor, introduce un nombre válido", name)
        validUser=false
    }

    if(!signUpValidation.checkUserName()){
        signUpValidation.errorCreator("Por favor, introduce un nombre de usuario válido", username)
        validUser=false
    }
   
    
    if(!signUpValidation.checkPassword()){
        signUpValidation.errorCreator("Por favor, introduce una contraseña válida", password)
        validUser=false
    }

    if(!signUpValidation.checkRepeatedPassword()){
        signUpValidation.errorCreator("Por favor, asegúrate de que ambas contraseñas son iguales", passwordCheck)
        validUser=false
    }
    
    if(!signUpValidation.checkEmail()){
        signUpValidation.errorCreator("Por favor, introduce un correo electrónico válido", email)
        validUser=false
    }
    
    if(signUpValidation.isTheUserInTheDb(userDb)){
        signUpValidation.errorCreator("Este correo ya está registrado, prueba a hacer Login", loginButton)
        validUser=false
    }
    return validUser
}

function deleteErrors (){
    let errors = [...document.getElementsByClassName("error")]
    errors ? errors.forEach(error => error.remove()) : null;
}

/*
    errorCreator (message, location) {}
    deleteErrors (){}
  */  