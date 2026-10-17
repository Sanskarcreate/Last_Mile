function register() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if(!username || !email || !password || !confirm) {
        document.getElementById("message").textContent = "Please fill in all the fields!";
        return;
    }

if (password !== confirm) {
    document.getElementById("message").textContent = "Passwords do not match";
    return;
}

if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("message").textContent = "Invalid email";
    return;
}

const users = JSON.parse(localStorage.getItem("users") || "[]");

users.push({username, email, password});

localStorage.setItem("users", JSON.stringify(users));

document.getElementById("message").textContent = "Acount created";
window.location.href = "login.html";
}

document.getElementById("register-button").addEventListener("click", register);