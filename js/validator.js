

class validator{
    constructor(username, password, email){
        this.username = username;
        this.password = password;
        this.email = email;
    }

     checkUserName(){
    return this.username.length > 3? true:false
    }

    checkPassword(){
        if (!this.password){
            return false
        } else if (this.password.length < 6){
            return false
        } else {
            return true
        }
    }

    checkEmail () {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email) ? true : false
    }

    errorCreator (message, location) {
        let errorLi = document.createElement("li")
        errorLi.setAttribute("class", "error text-danger")
        errorLi.innerHTML = `<br>${message}`
        errorList.appendChild(errorLi, location)
    }

    deleteErrors (){
        let errors = [...document.getElementsByClassName("error")]
        errors ? errors.forEach(error => error.remove()) : null;
    }
}


class signUpValidator extends validator{
    constructor(name, username, password, passwordCheck, email){
        super(username, password, email),
        this.name = name,
        this.passwordCheck = passwordCheck
    }

    checkName(){
        return this.name.length >1? true:false
    }
    checkRepeatedPassword(){
        return this.passwordCheck === this.password? true:false
    }
    
    isTheUserInTheDb(){
        if (!userDb){
            return false
        } else (userDb.forEach(function(user){
            return user.email != this.email? true:false
        }))        
    }
}


class loginValidator extends validator{
    constructor(){
        super();
    }

    isTheUserInTheDb(){
        if (!userDb){
            return false
        } else (userDb.forEach(function(user){
            return user.email != this.email? true:false
        }))        
    }
}