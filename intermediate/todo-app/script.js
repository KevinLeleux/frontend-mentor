/* Drag and drop */
const list = document.querySelector(".list");

new Sortable(list, {
    animation: 150,
    ghostClass: "dragging",
    filter: ".delete-icon",
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

function renderTasksList() {
    list.innerHTML = "";
    if (window.localStorage.getItem("List")) {
        myTasks = JSON.parse(window.localStorage.getItem("List"));
    }
    for (let index = 0; index < myTasks.length; index++) {
        const li = document.createElement("li");
        if (myTasks[index].completed === true) {
            li.setAttribute("class", " draggable completed");
        } else {
            li.setAttribute("class", "draggable");
        }
        li.setAttribute("draggable", "true");
        list.appendChild(li);
        const circleDiv = document.createElement("div");
        circleDiv.setAttribute("class", "circle");
        li.appendChild(circleDiv);
        const span = document.createElement("span");
        span.insertAdjacentText("beforeend", myTasks[index].name);
        li.appendChild(span);
        const img = document.createElement("img");
        img.setAttribute("src", "images/icon-cross.svg");
        img.setAttribute("class", "delete-icon visible");
        li.appendChild(img);
    }

    /* Delete Task */
    let closeIcon = document.getElementsByClassName("delete-icon");
    for (let index = 0; index < closeIcon.length; index++) {
        closeIcon[index].addEventListener("click", () => {
            deleteTask(closeIcon[index].parentNode);
            renderTasksList();
        });
    }
}

list.addEventListener("dragend", () => {
    save();
    renderTasksList();
});

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
        document.activeElement.blur();
    }
});

function createTask(name) {
    let newTask = { name: name, completed: false };
    myTasks.push(newTask);
    window.localStorage.setItem("List", JSON.stringify(myTasks));
    renderTasksList();
    save();
}

function deleteTask(task) {
    list.removeChild(task);
    save();
}

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
