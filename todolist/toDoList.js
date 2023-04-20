const todoButton = document.querySelector(".todo-button");
const toDoInput = document.querySelector(".todo-input");
const toDoContainer = document.querySelector(".todo-container");
const filterOption = document.querySelector(".filter-todos");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", (e)=>{
    if (toDoInput.value === "") toDoInput.value = "! Enter To Do";
    else {e.preventDefault();
    const toDoTask = document.createElement("div");
    toDoTask.classList.add("todo-list");
    const newTask = `<li>${toDoInput.value}</li>
    <span><i class="fa-regular fa-circle-check"></i></span>
    <span><i class="fa-regular fa-pen-to-square"></i></span>
    <span><i class="fa-regular fa-trash-can"></i></span>`;
    toDoTask.innerHTML = newTask;
    document.querySelector(".todo-container").appendChild(toDoTask);
    savedLocalTodos(toDoInput.value);
    toDoInput.value = "";
    }
});
toDoContainer.addEventListener("click", checkRemove);
function checkRemove(c) {
    const classList = [...c.target.classList];
    const item = c.target;
    if (classList[1] === "fa-circle-check") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed")
    }else if (classList[1] === "fa-trash-can") {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
};
filterOption.addEventListener("click", (e)=>{
    let todos = [...toDoContainer.childNodes];
    console.log(todos);
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all" :{ todo.nextSibling.style.display = "flex"
                break;
            }
            case "completed" : {
                if (todo.nextSibling.classList.contains("completed")) {
                    todo.nextSibling.style.display = "flex";
                } else {
                    todo.nextSibling.style.display = "none";
                }
                break;
            }   
            case "uncompleted" : {
                if (!todo.nextSibling.classList.contains("completed")) {
                    todo.nextSibling.style.display = "flex";
                } else {
                    todo.nextSibling.style.display = "none";
                }
                break;
            }
        }
    });
});


function savedLocalTodos(todo) {
    let savedTodos = localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : [];
    savedTodos.push(todo);
    localStorage.setItem("koft", JSON.stringify(savedTodos));
}
function getLocalTodos() {
    let savedTodos = localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : [];
    savedTodos.forEach(item=> {const toDoTask = document.createElement("div");
    toDoTask.classList.add("todo-list");
    const newTask = `<li>${item}</li>
    <span><i class="fa-regular fa-circle-check"></i></span>
    <span><i class="fa-regular fa-pen-to-square"></i></span>
    <span><i class="fa-regular fa-trash-can"></i></span>`;
    toDoTask.innerHTML = newTask;
    document.querySelector(".todo-container").appendChild(toDoTask);
    });
}
function removeLocalTodos(todo){
    let savedTodos = localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : [];
    const filterT = savedTodos.filter(t=> t !== todo.children[0].innerText);
    localStorage.setItem("item", JSON.stringify(filterT));
}