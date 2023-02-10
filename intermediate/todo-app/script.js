/* Drag and drop */
const list = document.querySelector(".list");

new Sortable(list, {
    animation: 150,
    ghostClass: "dragging",
    filter: ".delete-icon, .checkbox-round",
    onEnd: dragEnd,
});

/* LocalStorage init */
let myTasks = [
    {
        name: "Complete online JavaScript course",
        completed: true,
    },
    {
        name: "Jog around the park 3x",
        completed: true,
    },
    {
        name: "10 minutes meditation",
        completed: false,
    },
    {
        name: "Read for 1 hour",
        completed: false,
    },
    {
        name: "Pick up groceries",
        completed: false,
    },
    {
        name: "Complete Todo App on Frontend Mentor",
        completed: false,
    },
];

/* Filters */
let draggable;
function renderTasksList() {
    filters.forEach((element) => {
        element.classList.remove("selected");
    });
    filters[0].classList.add("selected");
    list.innerHTML = "";
    if (window.localStorage.getItem("List")) {
        myTasks = JSON.parse(window.localStorage.getItem("List"));
    }
    save();
    for (let index = 0; index < myTasks.length; index++) {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        if (myTasks[index].completed === true) {
            li.setAttribute("class", " draggable completed");
            checkbox.checked = "checked";
        } else {
            li.setAttribute("class", "draggable");
        }
        li.setAttribute("draggable", "true");
        list.appendChild(li);
        checkbox.type = "checkbox";
        checkbox.classList = "checkbox-round";
        li.appendChild(checkbox);
        const span = document.createElement("span");
        span.insertAdjacentText("beforeend", myTasks[index].name);
        li.appendChild(span);
        const img = document.createElement("img");
        img.setAttribute("src", "images/icon-cross.svg");
        img.setAttribute("class", "delete-icon visible");
        li.appendChild(img);
    }

    /* Delete Task */
    let closeIcon = document.querySelectorAll(".delete-icon");
    for (let index = 0; index < closeIcon.length; index++) {
        closeIcon[index].addEventListener("click", () => {
            deleteTask(closeIcon[index].parentNode);
            renderTasksList();
        });
    }
    draggable = document.querySelectorAll(".draggable");

    completeTask();
    tasksLeft();
}

list.addEventListener("dragstart", function () {
    const deleteIcon = document.querySelectorAll(".delete-icon");
    deleteIcon.forEach((element) => {
        element.style.display = "none";
    });
});

function dragEnd() {
    save();
    renderTasksList();
}

/* Create Tasks */
const input = document.querySelector(".input");
input.addEventListener("keypress", function (e) {
    if (e.keyCode == "13" && input.value) {
        createTask(input.value);
        input.value = "";
        /* Hide keyboard on mobile */
        document.activeElement.blur();
    }
});

function createTask(name) {
    let newTask = { name: name, completed: false };
    myTasks.push(newTask);
    window.localStorage.setItem("List", JSON.stringify(myTasks));
    renderTasksList();
}

function completeTask() {
    /* Complete Tasks */
    const checkboxCheck = document.querySelectorAll(".checkbox-round");
    const draggable = document.querySelectorAll(".draggable");
    for (let index = 0; index < checkboxCheck.length; index++) {
        checkboxCheck[index].addEventListener("click", function () {
            if (checkboxCheck[index].checked) {
                draggable[index].classList.add("completed");
                myTasks[index].completed = "True";
                save();
                renderTasksList();
            } else {
                draggable[index].classList.remove("completed");
                myTasks[index].completed = "False";
                save();
                renderTasksList();
            }
        });
    }
}

function deleteTask(task) {
    list.removeChild(task);
    save();
}

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
    deleteCompleteTask();
});

function deleteCompleteTask() {
    let completed = document.querySelectorAll(".completed");
    for (let index = 0; index < completed.length; index++) {
        list.removeChild(completed[index]);
    }
    save();
    renderTasksList();
}

function tasksLeft() {
    let left = 0;
    for (let index = 0; index < myTasks.length; index++) {
        if (!myTasks[index].completed) {
            left += 1;
        }
    }
    const itemsLeft = document.querySelector(".list-footer span");
    itemsLeft.innerHTML = "";
    itemsLeft.insertAdjacentText("afterbegin", left + " items left");
}

const filters = document.querySelectorAll(".filters span");
filters.forEach((element) => {
    element.addEventListener("click", function () {
        filters.forEach((element) => {
            element.classList.remove("selected");
        });
        element.classList.add("selected");
        if (element.innerText == "Active") {
            for (let index = 0; index < draggable.length; index++) {
                draggable[index].classList.remove("hidden");
                if (draggable[index].classList.contains("completed")) {
                    draggable[index].classList.add("hidden");
                }
            }
        } else if (element.innerText == "Completed") {
            for (let index = 0; index < draggable.length; index++) {
                draggable[index].classList.remove("hidden");
                if (!draggable[index].classList.contains("completed")) {
                    draggable[index].classList.add("hidden");
                }
            }
        } else {
            for (let index = 0; index < draggable.length; index++) {
                draggable[index].classList.remove("hidden");
            }
        }
    });
});

function save() {
    let myTasksTemp = [];
    let tasksTemp = "";
    const draggableTemp = document.querySelectorAll(".draggable");
    draggableTemp.forEach((element) => {
        let name = element.innerText;
        if (element.classList.contains("completed")) {
            tasksTemp = { name: name, completed: true };
        } else {
            tasksTemp = { name: name, completed: false };
        }
        myTasksTemp.push(tasksTemp);
    });
    window.localStorage.setItem("List", JSON.stringify(myTasksTemp));
}

window.addEventListener("beforeunload", save);

renderTasksList();
