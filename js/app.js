const dateTodo = document.getElementById("date-todo");
const timeTodo = document.getElementById("time-todo");
const textTaskTodo = document.getElementById("text-task-todo");
const addButton = document.getElementById("add-button");
const modeTodo = document.getElementById("select-status");
const subjectTodo = document.getElementById("subject-todo");


const filters = document.querySelectorAll(".filter");
const addTodo = document.getElementById("add-todo");
const mainSection = document.getElementById("main");
const loading = document.getElementById("loading");
const addTaskTodo = document.getElementById("add-task-todo")


//---------------------
const date = new Date();
const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
console.log(day);

//Todos----------------------------------------------
let todos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(todos);


//Save to Localstorage -----------------------------------
const saveLocalstorage = () => {
  localStorage.setItem("todos" , JSON.stringify(todos));
}

//generatedId--------------------------------------------
const generatedId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10 , 15)).toString();
}



//Display Todos------------------------------------------------
const displayTodo = () => {

    todos.forEach(todo => {
        loading.innerHTML = `
              <div class="todo-box">
                  <h3>${todo.day === day.toString() ? "Today" : `${todo.day} : ${todo.day}` }</h3>
                  <div class="box">
                      <input type="radio" name="complete">
                      <div>
                        <span>${todo.mode} and ${todo.subject} | </span>
                        <span>${todo.day} | </span>
                        <span>${todo.time}</span>
                        <p>${todo.task}</p>
                      </div>
                  </div>
              </div>
       `
    })
}



//Add Todos-------------------------------------------------------------
const createAddTodoHandler = () => {

    const subject = subjectTodo.value;
    const day = dateTodo.value;
    const time = timeTodo.value;
    const task = textTaskTodo.value;
    const mode = modeTodo.value;

    const todo = {
        id : generatedId(),
        complete : false ,
        mode ,
        subject ,
        day ,
        time,
        task,
    }

    todos.push(todo);
    saveLocalstorage();
    displayTodo();
    modeTodo.value="";
    subjectTodo.value="";
    dateTodo.value="";
    timeTodo.value="";
    textTaskTodo.value="";
}



addButton.addEventListener("click" , createAddTodoHandler);
addTodo.addEventListener("click" , () => {
    addTaskTodo.style.display="inline-block";
})
