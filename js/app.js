const mainSection = document.getElementById("main");
const flaggedCheckedBox = document.getElementById("flagged");
const modeTodo = document.getElementById("select-status");
const subjectTodo = document.getElementById("subject-todo");
const dateTodo = document.getElementById("date-todo");
const timeTodo = document.getElementById("time-todo");
const textTaskTodo = document.getElementById("text-task-todo");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const cancelEdit = document.getElementById("cancel-edit");
const cancelAdd = document.getElementById("cancel-add");
const tittleTodo = document.getElementById("title-todo");

const navIcon = document.getElementById("nav-bar-icon");
const imaBackgroundList = document.querySelectorAll(".bg-img");
const boxBackground = document.getElementById("box-background");

let loading = document.getElementById("loading");
const loadingHeader = document.querySelector(".loading-header");
let loadingCompleted = document.getElementById("loading-completed");
const addTodo = document.getElementById("add-todo");
const boxTask = document.querySelector(".box-task");
const filters = document.querySelectorAll(".filter");

const todayCount = document.querySelector(".today-counter");
const allCount = document.querySelector(".all-counter");
const completedCount = document.querySelector(".completed-counter");
const pendingCount = document.querySelector(".pending-counter");
const flagCount = document.querySelector(".flagged-counter");
const familyCount = document.querySelector(".family-counter");
const workCount = document.querySelector(".work-counter");
const educationalCount = document.querySelector(".educational-counter");


//-------------------------------------------------------------------------------------------------------
const dayWeek = ["ُSunday" , "Monday" , "Tuesday" , "wednesday" , "Thursday" , "Friday" , "Saturday"];
const mount = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"];



//date ---------------------------------------------------------
const fullDate = new Date();
const getDate = fullDate.getDate() ;
const getMonth = fullDate.getMonth() + 1;
const date = `${fullDate.getFullYear()}-${getMonth<10 ? '0'+`${getMonth}` : `${getMonth}`}-${getDate<10 ? '0'+`${getDate}` : `${getDate}`}`;

//Todos---------------------------------------------------------
let todos = JSON.parse(localStorage.getItem("todos")) || [];

let pendingArray =todos.filter(todo => todo.complete === false) || [];
let completedArray =todos.filter(todo => todo.complete === true) || [];
let todayArray =todos.filter(todo => todo.day === date) || [];
let flaggedArray =todos.filter(todo => todo.flag === true) || [];
let familyArray =todos.filter(todo => todo.mode === "Family") || [];
let workArray = todos.filter(todo => todo.mode === "Work") || [];
let educationalArray = todos.filter(todo => todo.mode === "Educational") || [];
let allArray = [...pendingArray , ...completedArray];

//Save to Localstorage ------------------------------------------
const saveLocalstorage = () => {
  localStorage.setItem("todos" , JSON.stringify(todos));
}

const saveLocalstorageLastTodo = (lastTodo) => {
    localStorage.setItem("lastTodo" , JSON.stringify(lastTodo));
}

//generatedId-----------------------------------------------------
const generatedId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10 , 15)).toString();
}

//show Background Handler ------------------------------------------
const showBackgroundHandler = () => {
    boxBackground.classList.toggle("box-background2");
}

//setImageBackground-----------------------------------------------

const setImageBackground = (event) => {
    const srcImage = event.target.attributes[1].nodeValue.toString();
    localStorage.setItem("imgSrc" , JSON.stringify(srcImage));
    firstLoading();
}

//-change complete in Todo ------------------------------------------
const changeComplete = (id) => {
    let filterName = JSON.parse(localStorage.getItem("filter"));
    let findTodo = todos.find(todo => todo.id === id).complete;
    const changStatus = todos.find(todo => todo.id === id);
    changStatus.complete = !changStatus.complete;
    if(changStatus.complete === true){
        completedArray.forEach(todo => todo.animation="");
        changStatus.animation = true;
        completedArray.unshift(changStatus);
        let newPending = pendingArray.filter(todo => todo.id !== id);
        newPending.forEach(todo => {
            todo.animation="";
        })
        pendingArray = newPending;
    }
    if(changStatus.complete === false){
        pendingArray.forEach(todo => todo.animation="");
        changStatus.animation = true;
        pendingArray.unshift(changStatus);
        let newCompleted = completedArray.filter(todo => todo.id !== id);
        newCompleted.forEach(todo => {
            todo.animation="";
        });
        completedArray = newCompleted;
    }
    saveLocalstorage();
    showDisplayWithFilter(filterName , findTodo);
    displayTodo();
    firstLoading();

}


//Edit todo in list handler -----------------------------------------
const editedHandler = (id) => {
  boxTask.classList.add("box-task2");
  const filterTodo = todos.find(todo => todo.id === id);
  tittleTodo.innerText="Edit Todo :";
  flaggedCheckedBox.checked=filterTodo.flag;
  modeTodo.value = filterTodo.mode;
  subjectTodo.value= filterTodo.subject;
  dateTodo.value= filterTodo.day;
  timeTodo.value= filterTodo.time;
  textTaskTodo.value=filterTodo.task;

 addButton.style.display="none";
 cancelAdd.style.display="none";
 editButton.style.display="block";
 cancelEdit.style.display="block";
 editButton.dataset.id=id;

 addTodo.style.display="none";
}

const editTodoList = (event) => {
    const idTodo = event.target.dataset.id;
    const findTodoList = todos.find(todo => todo.id === idTodo);
    let filterName = JSON.parse(localStorage.getItem("filter"));
    let findTodo = todos.find(todo => todo.id === idTodo).complete;
    findTodoList.flag=flaggedCheckedBox.checked;
    findTodoList.mode = modeTodo.value;
    findTodoList.subject = subjectTodo.value;
    findTodoList.day = dateTodo.value;
    findTodoList.time = timeTodo.value;
    findTodoList.task = textTaskTodo.value;
    saveLocalstorage();
    showDisplayWithFilter(filterName , findTodo);
    displayTodo();
    firstLoading();
    // editButton.style.display="none";
    // addButton.style.display="block";
    boxTask.classList.remove("box-task2");

    modeTodo.value = "";
    subjectTodo.value="";
    dateTodo.value="";
    timeTodo.value="";
    textTaskTodo.value="";
    flaggedCheckedBox.checked=false;
    addTodo.style.display="block";
}


const cancelEditHandler = () => {
    addButton.style.display="block";
    cancelAdd.style.display="block";
    editButton.style.display="none";
    cancelEdit.style.display="none";
    modeTodo.value = "";
    subjectTodo.value="";
    dateTodo.value="";
    timeTodo.value="";
    textTaskTodo.value="";
    flaggedCheckedBox.checked=false;
    boxTask.classList.remove("box-task2");
    addTodo.style.display="block";
}

const cancelAddHandler = () => {
    boxTask.classList.remove("box-task2");
    addTodo.style.display="block";
}


//Delete Todo for list Todos--------------------------------------
const deleteTodo = (id) => {
    let filterName = JSON.parse(localStorage.getItem("filter"));
    let findCompleted = todos.find(todo => todo.id === id).complete;
    const findMode = todos.find(todo => todo.id === id).mode;
    let newTodos = todos.filter(todo => todo.id !== id);
    todos = newTodos;
    if(findCompleted === false){
        let newPending = pendingArray.filter(todo => todo.id !== id);
        pendingArray = newPending;
    }
    if(findCompleted === true){
        let newCompleted = completedArray.filter(todo => todo.id !== id);
        completedArray = newCompleted;
    }
    saveLocalstorage();
    showDisplayWithFilter(filterName , findCompleted , findMode);
    displayTodo();
    firstLoading();
}


//Display Todos----------------------------------------------------
const displayTodo = () => {
    loading.innerHTML="";
    loadingCompleted.innerHTML="";

    const lastTodos = JSON.parse(localStorage.getItem("lastTodo"));

    if (!lastTodos.length){
       loading.innerHTML = `<div> <p class="alert-msg">Note found Todo List Data</p> </div>`
    }

    lastTodos.forEach(todo => {
        const splitTodoDay = todo.day.split("-");

        if(!todo.complete){
            loading.innerHTML += `
              <div class="todo-boxes ${todo.animation === true 
                ? "animate__animated animate__fadeInUp" : "" }">
                 <div class="info-todo">
                    <h3>${todo.day === date.toString() ? "Today" : `${splitTodoDay[0]}  ${mount[+splitTodoDay[1] -1]}  ${+splitTodoDay[2]}`} 
                         ${todo.flag === true ? `<img class="favourite-icons" src="../image/icons/flag-Red.svg"/> 
                            <img class="favourite-icons" src="../image/icons/flag-Red.svg"/>` : ''} </h3>
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
              </div>`;

        } else {
            loadingCompleted.innerHTML += `
              <div class="todo-boxes-complete ${todo.animation === true
                ? "animate__animated animate__fadeInDown" : ""}">
                 <div class="info-todo">
                    <h3>${todo.day === date.toString() ? "Today" : `${splitTodoDay[0]}  ${mount[+splitTodoDay[1] -1]}  ${+splitTodoDay[2]}`} 
                         ${todo.flag === true ? `<img class="favourite-icons" src="../image/icons/flag-Red.svg"/> 
                            <img class="favourite-icons" src="../image/icons/flag-Red.svg"/>` : ''} </h3>
                    <div class="box">
                       <p>${todo.mode} <span>and</span>  ${todo.subject} | <span>${todo.time}</span></p>
                       <p>${todo.task}</p>
                    </div>
                 </div>
                 <div class="img-control">
                   <button class="btn-undo" onclick="changeComplete('${todo.id}')">Undo</button>
                   <img id="tick-marked" src="../image/icons/tick-mark.svg">
                   <img id="delete-todo-complete" src="../image/icons/close.svg" onclick="deleteTodo('${todo.id}')">
                 </div>      
              </div>`;
        }
    })
}

//Add Todos-----------------------------------------------------------
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
        animation : "" ,
    }

    if (subject && day && time && task && mode){
        todos.unshift(todo);
        saveLocalstorage();
        saveLocalstorageLastTodo(todos);
        displayTodo();
        firstLoading();
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

//Filter Display----------------------------------------------

const filterDisplay = (event) => {
    boxTask.classList.remove("box-task2");
  let filterName = event.target.dataset.filter;
    localStorage.setItem("filter" , JSON.stringify(filterName));
  switch (filterName){
      case "completed":
          loadingHeader.innerText="Completed :";
          saveLocalstorageLastTodo(completedArray);
          displayTodo();
          return;
      case "pending":
          loadingHeader.innerText = "Pending :";
          saveLocalstorageLastTodo(pendingArray);
          displayTodo();
          return;
      case "today":
          loadingHeader.innerText = "Today :";
          saveLocalstorageLastTodo(todayArray);
          displayTodo();
          return;
      case "flagged":
          loadingHeader.innerText = "Flagged :";
          saveLocalstorageLastTodo(flaggedArray);
          displayTodo()
          return;
      case "family":
          loadingHeader.innerText = "Family :";
          saveLocalstorageLastTodo(familyArray);
          displayTodo();
          return;
      case "work":
          loadingHeader.innerText = "Work :";
          saveLocalstorageLastTodo(workArray);
          displayTodo();
          return;
      case "educational":
          loadingHeader.innerText = "Educational :";
          saveLocalstorageLastTodo(educationalArray);
          displayTodo()
          return;
      default:
          loadingHeader.innerText = "All Todos :";
          allArray = [...pendingArray , ...completedArray];
          saveLocalstorageLastTodo(allArray);
          displayTodo();
          return;
  }
}


//Show Filtered Todo list -------------------------------------------
const showDisplayWithFilter = (filterName , findTodo , findMode) => {
    if(filterName === "completed" && findTodo){
        saveLocalstorageLastTodo(completedArray);
    } else if(filterName === "pending" && !findTodo){
        saveLocalstorageLastTodo(pendingArray);
    }else if(filterName === "today"){
        saveLocalstorageLastTodo(todayArray);
    } else if(filterName === "flagged"){
        saveLocalstorageLastTodo(flaggedArray);
    } else if(filterName === "family"){
        saveLocalstorageLastTodo(familyArray)
    } else if (filterName === "work"){
        saveLocalstorageLastTodo(workArray)
    } else if (filterName === "educational"){
        saveLocalstorageLastTodo(educationalArray)
    } else if (filterName === "all"){
        allArray = [...pendingArray , ...completedArray];
        saveLocalstorageLastTodo(allArray);
    }
}

//windows loading----------------------------------------------
const firstLoading = () => {
    mainSection.style.backgroundImage=`url(${JSON.parse(localStorage.getItem("imgSrc"))})`;


    pendingArray =todos.filter(todo => todo.complete === false) || [];
    completedArray =todos.filter(todo => todo.complete === true) || [];
    todayArray =todos.filter(todo => todo.day === date) || [];
    flaggedArray =todos.filter(todo => todo.flag === true) || [];
    familyArray =todos.filter(todo => todo.mode === "Family") || [];
    workArray = todos.filter(todo => todo.mode === "Work") || [];
    educationalArray = todos.filter(todo => todo.mode === "Educational") || [];
    allArray = [...pendingArray , ...completedArray];

    allArray.forEach(todo => todo.animation="");

    const today = todos.filter(todo => todo.day === date.toString());
    todayCount.innerText = today.length;
    allCount.innerText= todos.length;
    const pending = todos.filter(todo => todo.complete === false);
    pendingCount.innerText = pending.length;
    const completed = todos.filter(todo => todo.complete === true);
    completedCount.innerText = completed.length;
    const flagged = todos.filter(todo => todo.flag === true);
    flagCount.innerText = flagged.length;
    const family = todos.filter(todo => todo.mode === "Family");
    familyCount.innerText = family.length;
    const work = todos.filter(todo => todo.mode === "Work");
    workCount.innerText = work.length;
    const educational = todos.filter(todo => todo.mode === "Educational");
    educationalCount.innerText = educational.length;
}


window.addEventListener("load" , firstLoading);
navIcon.addEventListener("click" , showBackgroundHandler);
addButton.addEventListener("click" , createAddTodoHandler);
editButton.addEventListener("click" , editTodoList);
cancelEdit.addEventListener("click" , cancelEditHandler);
cancelAdd.addEventListener("click" , cancelAddHandler);

filters.forEach(filter => {
    filter.addEventListener("click" , filterDisplay)
})

imaBackgroundList.forEach(img => {
    img.addEventListener("click" , setImageBackground);
})

boxBackground.addEventListener("click" , () => {
    boxBackground.classList.remove("box-background2");
})

addTodo.addEventListener("click" , () => {
    boxTask.classList.toggle("box-task2");
    tittleTodo.innerText="Add task:";
    modeTodo.value="";
    subjectTodo.value="";
    dateTodo.value="";
    timeTodo.value="";
    textTaskTodo.value="";
    flaggedCheckedBox.checked=false;
})