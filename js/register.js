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
    if (isUserValid()) {
        createNewUser(name.value, username.value, password.value, email.value)}
}

function isUserValid(){
    
    let signUpValidation = new signUpValidator(username.value, password.value, email.value, name.value, passwordCheck.value)

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
    userDb? userDd.push(newUser) :  userDb = [newUser]
    localStorage.setItem('users', JSON.stringify(userDb));
} 


function deleteErrors (){
    let errors = [...document.getElementsByClassName("error")]
    errors ? errors.forEach(error => error.remove()) : null;
}