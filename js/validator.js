class User {
    constructor(name, username, password, email) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class validator {
    constructor(password, email) {
        this.password = password;
        this.email = email;
    }

    checkPassword() {
        if (!this.password) {
            return false
        } else if (this.password.length < 6) {
            return false
        } else {
            return true
        }
    }

    checkEmail() {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email) ? true : false
    }

    errorCreator(message, location) {
        let errorLi = document.createElement("li")
        errorLi.setAttribute("class", "error text-danger")
        errorLi.innerHTML = `<br>${message}`
        errorList.appendChild(errorLi, location)
    }

    deleteErrors() {
        let errors = [...document.getElementsByClassName("error")]
        errors ? errors.forEach(error => error.remove()) : null;
    }
}


class signUpValidator extends validator {
    constructor(password, email, name, username, passwordCheck) {
        super(password, email);
        this.name = name;
        this.username = username;
        this.passwordCheck = passwordCheck;
    }

    checkName() {
        return this.name.length > 1 ? true : false
    }

    checkUserName() {
        return this.username.length > 3 ? true : false
    }

    checkRepeatedPassword() {
        return this.passwordCheck === this.password ? true : false
    }

    isTheUserInTheDb(userDb) {
        console.log(this.email)
        let userExists = true;

        if (!userDb) {
            return true;
        } else {
            userDb.forEach(user => {
                if (user.email === this.email) {
                    userExists = false
                }
            })
        }
        return userExists;
    }

}


class loginValidator extends validator {
    constructor(password, email) {
        super(password, email);
    }
    isTheUserInTheDb() {
        let userExists = false;
        if (!userDb) {
            return false;
        } else {
            userDb.forEach(user => {
                if (user.email === this.email) {
                    userExists = true
                }
            })
        }
        return userExists;
    }
}