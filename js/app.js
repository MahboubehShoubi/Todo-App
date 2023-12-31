const mainSection = document.getElementById("main");
const flaggedCheckedBox = document.getElementById("flagged");
const modeTodo = document.getElementById("select-status");
const subjectTodo = document.getElementById("subject-todo");
const dateTodo = document.getElementById("date-todo");
const timeTodo = document.getElementById("time-todo");
const textTaskTodo = document.getElementById("text-task-todo");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");

const navIcon = document.getElementById("nav-bar-icon");
const imaBackgroundList = document.querySelectorAll(".bg-img");
const boxBackground = document.getElementById("box-background");

const addTodo = document.getElementById("add-todo");
const loading = document.getElementById("loading");
const addTaskTodo = document.getElementById("add-task-todo")
const filters = document.querySelectorAll(".filter");

const todayCount = document.querySelector(".today-counter");
const allCount = document.querySelector(".all-counter");
const flagCount = document.querySelector(".flagged-counter");



const dayWeek = ["ُSunday" , "Monday" , "Tuesday" , "wednesday" , "Thursday" , "Friday" , "Saturday"];
const mount = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"];



//---------------------
const fullDate = new Date();
const date = `${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()}`;
console.log(date);

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


const showBackgroundHandler = () => {
    boxBackground.style.display="block";
}



//-change complete in Todo ----------------------------------------------
const changeComplete = (id) => {
    const changStatus = todos.find(todo => todo.id === id);
    changStatus.complete = !changStatus.complete;
    saveLocalstorage();
    displayTodo(todos);
}


//Edit todo in list handler --------------------------------------------
const editedHandler = (id) => {
  const filterTodo = todos.find(todo => todo.id === id);
  modeTodo.value = filterTodo.mode;
  subjectTodo.value= filterTodo.subject;
  dateTodo.value= filterTodo.day;
  timeTodo.value= filterTodo.time;
  textTaskTodo.value=filterTodo.task;

 addButton.style.display="none";
 editButton.style.display="block";
 editButton.dataset.id=id;
}

const editTodoList = (event) => {
    const idTodo = event.target.dataset.id;
    console.log(idTodo);
    const findTodo = todos.find(todo => todo.id === idTodo);
    findTodo.mode = modeTodo.value;
    findTodo.subject = subjectTodo.value;
    findTodo.day = dateTodo.value;
    findTodo.time = timeTodo.value;
    findTodo.task = textTaskTodo.value;
    saveLocalstorage();
    displayTodo(todos);
    editButton.style.display="none";
    addButton.style.display="block";

    modeTodo.value = "";
    subjectTodo.value="";
    dateTodo.value="";
    timeTodo.value="";
    textTaskTodo.value="";
}


//Delete Todo for list Todos--------------------------------------
const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    todos = newTodos;
    saveLocalstorage();
    displayTodo(todos);
}



//Display Todos------------------------------------------------
const displayTodo = (todoList) => {
    loading.innerHTML="";

    if (!todoList.length){
       loading.innerHTML = `<div> <p>Note found Todo List Data</p> </div>`
    }

    todoList.forEach(todo => {
        const splitTodoDay = todo.day.split("-");

        loading.innerHTML += `
              <div class=${todo.complete ? "todo-boxes-complete" : "todo-boxes"} >
                 <div class="info-todo">
                    <h3>${todo.day === date.toString() ? "Today" : `${splitTodoDay[0]}  ${mount[+splitTodoDay[1] -1]}  ${+splitTodoDay[2]}`} 
                         ${todo.flag === true && `<img class="favourite-icons" src="../image/icons/favourite.svg"/> 
                            <img class="favourite-icons" src="../image/icons/favourite.svg"/> 
                            <img class="favourite-icons" src="../image/icons/favourite.svg"/>`} </h3>
                    <div class="box">
                       <p>${todo.mode} <span>and</span>  ${todo.subject} | <span>${todo.time}</span></p>
                       <p>${todo.task}</p>
                    </div>
                 </div>
                 
                 <div class="control-box">
                   <button class="edit-btn" onclick="editedHandler('${todo.id}')" >Edit</button>
                   <button class="complete-btn" onclick="changeComplete('${todo.id}')">Complete</button>  
                   <button class="delete-todo-btn" onclick="deleteTodo('${todo.id}')">Delete</button>
                 </div>
                 <div class="img-control">
                   <img id="tick-marked" src="../image/icons/tick-mark.svg">
                   <img id="delete-todo-complete" src="../image/icons/close.svg" onclick="deleteTodo('${todo.id}')">
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
    let flag = null;

    if(flaggedCheckedBox.checked){
        flag = true;
    }else {
        flag = false;
    }

    const todo = {
        id : generatedId(),
        complete : false ,
        mode ,
        subject ,
        day ,
        time,
        task,
        flag ,
    }

    if (subject && day && time && task && mode){
        todos.push(todo);
        saveLocalstorage();
        displayTodo(todos);
        modeTodo.value="";
        subjectTodo.value="";
        dateTodo.value="";
        timeTodo.value="";
        textTaskTodo.value="";
        flaggedCheckedBox.checked=false;
    }else {
        alert("please Enter informations");
    }


}

//Filter Display-----------------------------------

const filterDisplay = (event) => {
  let filterName = event.target.dataset.filter;

  switch (filterName){
      case "completed": {
          const completeList = todos.filter(todo => todo.complete === true);
          displayTodo(completeList);
          return;
      }
      case "pending": {
          const pendingList = todos.filter(todo => todo.complete === false);
          displayTodo(pendingList);
          return;
      }
      default:
          displayTodo(todos);
          return;
  }
}

//windows loading-------------------------------
const firstLoading = () => {
    const today = todos.filter(todo => todo.day === date.toString());
    todayCount.innerText = today.length;
    allCount.innerText= todos.length;

    const flagged = todos.filter(todo => todo.flag === true);
    flagCount.innerText = flagged.length;

    displayTodo(todos);


    }


window.addEventListener("load" , firstLoading);
navIcon.addEventListener("click" , showBackgroundHandler);
addButton.addEventListener("click" , createAddTodoHandler);
editButton.addEventListener("click" , editTodoList);
addTodo.addEventListener("click" , () => {
    addTaskTodo.style.display="inline-block";
})
filters.forEach(filter => {
    filter.addEventListener("click" , filterDisplay)
})