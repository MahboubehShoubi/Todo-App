const filters = document.querySelectorAll(".filter");
const addTodo = document.getElementById("add-todo");
const mainSection = document.getElementById("main");



let todos = localStorage.getItem("todos") || [];
console.log(todos);


const createAddTodoHandler = () => {
console.log("Craete Add to do");
}
addTodo.addEventListener("click" , createAddTodoHandler);