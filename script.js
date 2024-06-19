const btnElement = document.querySelector(".btn");
const inputElement = document.querySelector("#input-field");
const taskListElement = document.querySelector(".list-item");

btnElement.addEventListener("click", () => {
    if (inputElement.value.trim() === "") {
        alert("Please add your task first");
        return;
    } else {
        addTask(inputElement.value);
        inputElement.value = "";
    }
});

taskListElement.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    saveTasks();
});

function addTask(task) {
    let listItemElement = document.createElement("li");
    listItemElement.textContent = task;

    let spanElement = document.createElement("span");
    spanElement.textContent = "\u00d7";
    listItemElement.appendChild(spanElement);

    taskListElement.appendChild(listItemElement);

    saveTasks();
}

function saveTasks() {
    try {
        localStorage.setItem("tasks", taskListElement.innerHTML);
    } catch (error) {
        console.error("Could not save tasks to localStorage:", error);
    }
}

function loadTasks() {
    try {
        const tasks = localStorage.getItem("tasks");
        if (tasks) {
            taskListElement.innerHTML = tasks;
        }
    } catch (error) {
        console.error("Could not load tasks from localStorage:", error);
    }
}

function displayDate() {
    const dateElement = document.querySelector("#current-date");
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = today.toLocaleDateString(undefined, options);
}

loadTasks();
displayDate(); // Call the function to display the date when the page loads
