const loginForm = document.getElementById("login-form");
const loginInput = loginForm.querySelector("input");
const loginButton = loginForm.querySelector("button");

const USERNAME = "username";
const HIDDEN = "hidden";
const GREETING = "#greeting";

const username = localStorage.getItem(USERNAME);
const greetingForm = document.querySelector(GREETING);

const backgroundURLS = [
    "https://images.unsplash.com/photo-1507095952186-018dfd27c43f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60",
    "https://images.unsplash.com/photo-1529456589219-228196a9c50d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=60",
    "https://images.unsplash.com/photo-1616869736800-34ef43c096ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60"
];

if(username) {
    paintGreeting(username);
}
else {
    loginForm.classList.remove(HIDDEN);
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        paintGreeting(loginInput.value);
        localStorage.setItem(USERNAME, loginInput.value);
        loginForm.classList.add(HIDDEN);
    });
}
function paintGreeting(username) {
    
    const title = greetingForm.querySelector("h1");
    title.innerHTML = `Hi ${username}`;
    greetingForm.classList.remove(HIDDEN);
}

function drawClock(){
    const clock = greetingForm.querySelector("span.clock");
    clock.innerHTML = new Date().toLocaleString();
}
drawClock();
const timer = setInterval(drawClock, 500);


document.getElementsByTagName("body")[0].style.backgroundImage = `url(${backgroundURLS[parseInt(Math.random()*3)]})`;