function register() { //this function is using the ids from the register html page so that the user is able to type the correct texts int eh corect fields inside the boxes.
    const username = document.getElementById("username").value; // this is for the username
    const email = document.getElementById("email").value;// this is for the email
    const password = document.getElementById("password").value;// this is fort he password
    const confirm = document.getElementById("confirm").value;// this is to comfirm the password t be abvel to make the password.

    if(!username || !email || !password || !confirm) {
        document.getElementById("message").textContent = "Please fill in all the fields!";
        return;
    } // this if statement means that if either of one of theose values are true then display the message that is assigned. this is only going to siplay it is the user does not enter in one of the fields

if (password !== confirm) { // this if statmement checs whether the two elements are the same so if they are not the same it will display the passwords do no match however if they do it will let you login.
    document.getElementById("message").textContent = "Passwords do not match";
    return;
}

if (!email.includes("@") || !email.includes(".")) { // this if statement checks whether the email has a @ and a '.' in it otherwise it will say that the email is invalid.
    document.getElementById("message").textContent = "Invalid email";
    return;
}

const users = JSON.parse(localStorage.getItem("users") || "[]"); // this here is saying that it will go to the storage and see if the string is there or not and if not it will let oyu register however if the name is taken then it wont allow you to register.

users.push({username, email, password}); // this means that whatever information that the user writes it adds that information into the list which is the storage.

localStorage.setItem("users", JSON.stringify(users)); // this line here saves the users information so that they are able to use that information to log back into the account.

document.getElementById("message").textContent = "Acount created"; // this line here is fro when the account is created when all the fields is entered and when the fields is met it will display the message of account created and then it will redirect the user to the login page to log into the account that has just been created.
window.location.href = "login.html";
}

document.getElementById("register-button").addEventListener("click", register); // this line here is for the register button when the elements in the fields are typed the button acts as a comfirm buttoin to then store that buttin in the storage to then use that same information later on for the login page.