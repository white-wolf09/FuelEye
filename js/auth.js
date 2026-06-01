const ADMIN_EMAIL = "admin@fueleye.com";
const ADMIN_PASSWORD = "admin123";

function register() {

let user = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
password: document.getElementById("password").value
};

localStorage.setItem(
user.email,
JSON.stringify(user)
);

alert("Registered Successfully");
location.href = "login.html";
}

function login(){

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

if(
email === ADMIN_EMAIL &&
password === ADMIN_PASSWORD
){

window.location.href = "admin.html";
return;

}

let user =
JSON.parse(
localStorage.getItem(email)
);

if(
user &&
user.password === password
){

localStorage.setItem(
"loggedUser",
JSON.stringify(user)
);

window.location.href = "dashboard.html";

}
else{

alert("Invalid Credentials");

}

}