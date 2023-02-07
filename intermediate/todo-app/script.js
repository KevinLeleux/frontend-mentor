/* Drag and drop */
const list = document.querySelector(".list");

new Sortable(list, {
    animation: 150,
    ghostClass: "dragging",
    filter: ".delete-icon, .checkbox-round",
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
function renderTasksList() {
    list.innerHTML = "";
    if (window.localStorage.getItem("List")) {
        myTasks = JSON.parse(window.localStorage.getItem("List"));
    }
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

    /* Delete Completed Tasks */
    let clearButton = document.querySelector(".clear");
    clearButton.addEventListener("click", () => {
        deleteCompleteTask();
    });

    completeTask();
    tasksLeft();
}

list.addEventListener("dragend", dragEnd, false);

function dragEnd() {
    save();
    renderTasksList();
}

list.addEventListener(
    "dragover",
    function (event) {
        event.preventDefault();
    },
    false
);

/* Create Tasks */
const input = document.querySelector(".input");
input.addEventListener("keypress", function (e) {
    if (e.key == "Enter" && input.value) {
        createTask(input.value);
        input.value = "";
        /* Hide keyboard on mobile */
        document.activeElement.blur();
        save();
    }
});

function createTask(name) {
    myTasks = JSON.parse(window.localStorage.getItem("List"));
    let newTask = { name: name, completed: false };
    myTasks.push(newTask);
    window.localStorage.setItem("List", JSON.stringify(myTasks));
    renderTasksList();
}

function completeTask() {
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

function deleteCompleteTask() {
    let completed = document.querySelectorAll(".completed");
    for (let index = 0; index < completed.length; index++) {
        list.removeChild(completed[index]);
    }
    save();
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

/* Save to Local Storage */
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
    console.log(window.localStorage.getItem("List"));
}

window.addEventListener("beforeunload", save);

renderTasksList();

console.log(window.localStorage.getItem("List"));
