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
location.href="login.html";
}

function login() {

let email =
document.getElementById("email").value;

let password =
document.getElementById("password").value;

let user =
JSON.parse(localStorage.getItem(email));

if(user && user.password === password){

localStorage.setItem(
"loggedUser",
JSON.stringify(user)
);

location.href="dashboard.html";
}
else{
alert("Invalid Credentials");
}
}