function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        window.location.href = "index.html";
        } else {
        document.getElementById("message").textContent = "Wrong username or password!";
    }

}


document.getElementById("login-button").addEventListener("click", login);

