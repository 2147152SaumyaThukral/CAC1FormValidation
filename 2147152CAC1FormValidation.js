let firstname, lastname, email, password, address;

successStatus ={
    validfirstname: 0,
    validlastname: 0,
    validemail: 0,
    validpassword: 0,
    validaddress: 0,
};

onlyChar = (event) => {
    let input = event.which;
    if (input >47 && input <58)
    return false;
    else
    return true;
};

validation = (event) => {
    event.preventDefault();
    checkName("firstname");
    checkName("lastname");
    checkpassword();
    checkemail();
    checkaddress();
    if (statusChecker()===5) {
        userInfo ={
            firstname: firstname,
            lastname: lastname,
            email: email.value.trim(),
        };
        console.log(userInfo);
    }
};

checkName = (id) => {
    const name = document.getElementById(id);
    const nameVal = name.value.trim();
    console.log(name);

    if (id === "firstname") {
        firstname = nameVal;
    }
    if (id==="lastname") {
        lastname = nameVal;
    }

    if (nameVal === "") {
        if(id === "firstname") {
            successStatus.validfirstname = 0;
            return error(name, "Cannot be empty");
        }
        else if (id==="lastname") {
            successStatus.validlastname = 0;
            return error(name, "Cannot be empty");
        }
    } else if (id==="firstname" && nameVal.length <3) {
        successStatus.validfirstname =0;
        return error(name, "Name should not be less than 3 characters");

    }else {
        if(id === "firstname") {
            successStatus.validfirstname =1;
            return success(name);
        } else if (id === "lastname") {
            successStatus.validlastname=1;
            return success(name);
        }
    }
    }

    checkaddress = (id) => {
        const address = document.getElementById(id);
        const addressVal = address.value.trim();
        console.log(address);
    
        if (id === "address") {
            address = addressVal;
        }
    
        if (addressVal === "") {
            if(id === "address") {
                successStatus.validaddress = 0;
                return error(address, "Cannot be empty");
            }
        }else {
            if(id === "address") {
                successStatus.validaddress =1;
                return success(address);
            } 
        }
        }

    checkpassword = () => {
        password = document.getElementById("password");
        let passwordVal = password.value.trim();
        let passwordRegex1 = /[a-z]/;
        let passwordRegex2 = /[A-Z]/;
        let passwordRegex3 = /[0-9]/;
        let passwordRegex4 = /[~`!@#$%^&*;:"<>,./?]/;
        let passwordRegex5 = /[-_+={}]/;
        let passwordRegex6 = /[(){}|]/;
        let passwordRegex7 = /[/]/;
        let passwordRegex8 = /[\[\]]/;

        if (
            passwordVal.length >=8 && passwordVal.length <=14 &&
            passwordRegex1.test(passwordVal) &&
            passwordRegex2.test(passwordVal) &&
            passwordRegex3.test(passwordVal) &&
            (
                passwordRegex4.test(passwordVal) ||
                passwordRegex5.test(passwordVal) ||
                passwordRegex6.test(passwordVal) ||
                passwordRegex7.test(passwordVal) ||
                passwordRegex8.test(passwordVal)
            )
        ){       successStatus.validpassword =1;
            return success(password);
        }else {
            successStatus.validpassword =0;
            return error(
                password, 'Password should be between 8-14 characters \n minimum 1 a-z, 1 A-Z, 1 0-9, 1 (~`!@#$%^&*()-_+={}[]|;:"<>,./?)'
            );
        }
    };

    checkemail = () => {
        email = document.getElementById("email");
        let emailVal = email.value.trim();

        const emailRegex = /([a-z0-9\.\-_]{5,25})@christuniversity.in$/;

        if(emailRegex.test(emailVal))
        {
            successStatus.validemail=1;
            return success(email);
            
        } else {
            successStatus.validemail=0;
            return error(email, "The mail should follow university mail id format");

        }
    };

    success =(input) => {
        const formControl = input.parentElement;

        formControl.className = "form-control success";
    };

    error = (input, message) => {
        const formControl = input.parentElement;

        const small = formControl.querySelector("small");
        small.innerText = message;

        if (document.getElementById("password")===input) {
            formControl.className = "form-control error password";
        } else {
            formControl.className = "form-control error";
        }
    };


    statusChecker = () => {
        let sum =0;
        const objectKeys = object.keys(successStatus);
        objectKeys.foreach((key) => {
            sum += successStatus[key];
        });
        console.log(sum);
        return sum;
    }

    function myFunction() {
        document.getElementById("form").reset();
        }
