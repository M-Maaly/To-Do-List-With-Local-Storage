let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasks = document.querySelector(".tasks")
let task = document.querySelector(".task")

// Empty Array To Store Tasks
let arrayTask = [];

// Check there is tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayTask = JSON.parse(localStorage.getItem("tasks"))
}

// Triger get Data From Local Storage function
getDataFromLocalStorage();

// Add Task
submit.onclick = ()=> {
    if (input.value !== "") {
        addTaskToArray (input.value); // Add To Array
        input.value = ""; // Empty Feild Text
    }
}

// Click on Delete Button
tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        // // Remove Element from Local Storage
        deleteFromLocalStorage(e.target.parentElement.getAttribute("data-id"))
        // Remove Element from Page
        e.target.parentElement.remove()
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle completed
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle Done Class
        e.target.classList.toggle("done")
    }
})


function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task Data
    arrayTask.push(task);
    // Add Task To Page
    addElementsToPageFrom(arrayTask);
    // Add Data To Local Storage
    addDataToLocalStorageFrom(arrayTask)
}

function addElementsToPageFrom(task) {
    // Empty Tasks
    tasks.innerHTML = "";
    // Looping of array tasks
    arrayTask.forEach( (task)=> {
        // Create Main Div
        let divTask = document.createElement("div");
        divTask.className = "task";
        // Check If Task Is Done
        if (task.completed) {
            divTask.className = "task done"
        }
        divTask.setAttribute("data-id", task.id);
        divTask.textContent = task.title;
        // Create Delete Button
        let deleteButton = document.createElement("span");
        deleteButton.className = "del"
        deleteButton.textContent = "Delete";
        // Append Delete to Div
        divTask.appendChild(deleteButton)
        // Append Div to Page
        tasks.appendChild(divTask)
    })
}

function addDataToLocalStorageFrom(task) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayTask))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let taskat = JSON.parse(data)
        addElementsToPageFrom(taskat)
    }
}

function deleteFromLocalStorage(taskId) {
    // For Explain
    // for (let i = 0; i < arrayTask.length; i++) {
    //     console.log(`${arrayTask[i].id} === ${taskId}`);          
    // }
    arrayTask = arrayTask.filter((task)=> task.id != taskId)
    addDataToLocalStorageFrom(arrayTask)
}

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayTask.length; i++) {
        if (arrayTask[i].id == taskId) {
            arrayTask[i].completed == false ? (arrayTask[i].completed = true) : (arrayTask[i].completed = false)
        }
    }
    addDataToLocalStorageFrom(arrayTask)
}


