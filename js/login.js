function login() { // this function here is going to get he element by the id such as the username and password which would be in the storage after the user has registered.
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]"); // this here gets the item which is the users that is typed in the login page from the local storage to then allow you to log in.

    const user = users.find(u => u.username === username && u.password === password); // this here is saying to find the username and password that is typed and to make sure that each field matches the users in the list before allowing the user to log in.

    if (user) {
        localStorage.setItem("loggedInUser", user.username); // this here is when the user types in the right elements it will let redirect the user to the home page which means that they are logged in.
        window.location.href = "index.html";
        } else {
        document.getElementById("message").textContent = "Wrong username or password!";// this here is when the username or password typed is wrong it will display a message saying that either the username or password is wrong.
    }

}


document.getElementById("login-button").addEventListener("click", login);// this here is when the log in button is clicked the whole function will work which is all the above.

