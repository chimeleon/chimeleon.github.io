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


const APIKEY = "e9c163fdaa07e68309ffb352026610af";
function geoSuccess(position) {
    console.log(position);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${APIKEY}&units=metric`)
    .then(res=>res.json())
    .then(json=>{
        document.querySelector("#weather > span:first-child").innerHTML = json.name;
        document.querySelector("#weather > span:nth-of-type(2)").innerHTML = json.weather[0].main;
        document.querySelector("#weather > span:nth-of-type(3)").innerHTML = `${json.main.temp}°C`;
        document.querySelector("#weather > span:nth-of-type(4)").innerHTML = json.main.humidity;
    });
}
function geoFail() {

}
navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);


const todos = JSON.parse(localStorage.getItem("todos"))  || {};
const todoForm = document.querySelector("#todo-form");
const todoList = todoForm.querySelector(".todos");

function paintTodo(text, id) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const button = document.createElement("button");
    li.appendChild(span);
    li.innerText = text;
    button.innerText = "X";
    div.innerText = id;

    li.appendChild(button);

    button.addEventListener("click", function(e) {
        if(e.explicitOriginalTarget.name === "add-todo") return;
        delete todos[div.innerText];
        li.remove();
        updateTodos();
    });
    todoList.appendChild(li);
    updateTodos();
}

function addTodo(task) {
    const id = Date.now();
    todos[id] = task;
    updateTodos();
    paintTodo(task, id);
}

function updateTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

for(task in todos) {
    paintTodo(todos[task], task);
}
todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    e.stopPropagation();
    addTodo(todoForm.querySelector("[name=add-todo]").value);
    todoForm.querySelector("[name=add-todo]").value = "";
})