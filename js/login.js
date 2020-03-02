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
    if (isUserValid()===true) {
        createNewUser(name.value, userName.value, email.value, password.value)}
}

function isUserValid(){
    
    let signUpValidator = new singUpValidator(name, username, password, passwordCheck, email)
    let userDb = JSON.parse(localStorage.getItem("users"));
    let validUser = true;

    if(!signUpValidator.checkName()){
        signUpValidator.errorCreator("Por favor, introduce un nombre válido", name)
        validUser=false
    }

    if(!signUpValidator.checkUserName()){
        signUpValidator.errorCreator("Por favor, introduce un nombre de usuario válido", userName)
        validUser=false
    }
   
    
    if(!signUpValidator.checkPassword()){
        signUpValidator.errorCreator("Por favor, introduce una contraseña válida", password)
        validUser=false
    }

    if(!signUpValidator.checkRepeatedPassword()){
        signUpValidator.errorCreator("Por favor, asegúrate de que ambas contraseñas son iguales", passwordCheck)
        validUser=false
    }
    
    if(!signUpValidator.checkEmail()){
        signUpValidator.errorCreator("Por favor, introduce un correo electrónico válido", email)
        validUser=false
    }
    
    if(signUpValidator.isTheUserInTheDb()){
        signUpValidator.errorCreator("Este correo ya está registrado, prueba a hacer Login", loginButton)
        validUser=false
    }
    return validUser
}

/*
    errorCreator (message, location) {}
    deleteErrors (){}
  */  