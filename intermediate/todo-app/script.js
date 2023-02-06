/* Drag and drop */
const draggables = document.getElementsByClassName("draggable");
const containers = document.querySelectorAll(".list");

/* LocalStorage init */
let myTasks = [
    {
        id: "1",
        name: "Complete online JavaScript course",
        completed: false,
    },
    {
        id: "2",
        name: "Jog around the park 3x",
        completed: false,
    },
    {
        id: "3",
        name: "10 minutes meditation",
        completed: false,
    },
    {
        id: "4",
        name: "Read for 1 hour",
        completed: false,
    },
    {
        id: "5",
        name: "Pick up groceries",
        completed: false,
    },
    {
        id: "6",
        name: "Complete Todo App on Frontend Mentor",
        completed: false,
    },
];

let prevId = "";
let nextId = "";

function renderTasksList() {
    const listContainer = document.querySelector(".list");
    listContainer.innerHTML = "";
    for (let index = 0; index < myTasks.length; index++) {
        const li = document.createElement("li");
        li.setAttribute("class", "draggable");
        li.setAttribute("draggable", "true");
        li.setAttribute("id", myTasks[index].id);
        listContainer.appendChild(li);
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
}

renderTasksList();

for (let index = 0; index < draggables.length; index++) {
    draggables[index].addEventListener("dragstart", function () {
        draggables[index].classList.add("dragging");
    });
    draggables[index].addEventListener("dragend", function () {
        for (let index = 0; index < draggables.length; index++) {
            draggables[index].classList.remove("dragging");
            /*             renderTasksList();
             */
        }
        moveTask();
    });
}

function moveTask() {
    let prevIndex = myTasks.findIndex((p) => p.id == prevId);
    let nextIndex = myTasks.findIndex((p) => p.id == nextId);
    const element = myTasks.splice(prevIndex, 1)[0];
    myTasks.splice(nextIndex, 0, element);
    console.log(myTasks);
}

containers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
});

function dragOver(e) {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    const afterElement = getDragAfterElements(e.clientY);
    prevId = draggable.id;
    if (afterElement == null) {
        this.appendChild(draggable);
    } else {
        this.insertBefore(draggable, afterElement);
        nextId = afterElement.id;
    }
}

function getDragAfterElements(y) {
    const draggableElements = [
        ...document.querySelectorAll(".draggable:not(.dragging)"),
    ];
    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

/* Remove task */
const deleteIcon = document.querySelectorAll(".delete-icon");
for (let index = 0; index < deleteIcon.length; index++) {
    deleteIcon[index].addEventListener("click", () => {
        console.log(draggables[index]);
    });
}

const input = document.querySelector(".input");
input.addEventListener("keypress", function (e) {
    if (e.key == "Enter" && input.value) {
        createTask(input.value);
        input.value = "";
    }
});

function createTask(name) {
    let id = myTasks.length + 1;
    let newTask = { id: id.toString(), name: name, completed: false };
    myTasks.push(newTask);
}

/* Filters management*/
const filters = document.querySelectorAll(".filters span");
for (let index = 0; index < filters.length; index++) {
    filters[index].addEventListener("click", () => {
        filters.forEach((filter) => {
            filter.classList.remove("selected");
        });
        filters[index].classList.add("selected");
    });
}

/* Completed task */
const circles = document.getElementsByClassName("circle");
for (let index = 0; index < circles.length; index++) {
    circles[index].addEventListener("click", () => {
        if (draggables[index].classList.contains("completed")) {
            draggables[index].classList.remove("completed");
        } else {
            draggables[index].classList.add("completed");
        }
    });
}
