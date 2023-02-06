const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".list");

draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
    draggable.addEventListener("dragend", dragEnd);
});

function dragStart() {
    this.classList.add("dragging");
}

function dragEnd() {
    this.classList.remove("dragging");
}

containers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("dragleave", dragLeave);
    container.addEventListener("drop", dragDrop);
});

function dragOver(e) {
    e.preventDefault();
    const draggable = document.querySelector(".dragging");
    const afterElement = getDragAfterElements(e.clientY);
    if (afterElement == null) {
        this.appendChild(draggable);
    } else {
        this.insertBefore(draggable, afterElement);
    }
}
function dragEnter() {}
function dragLeave() {}
function dragDrop() {
}

function getDragAfterElements(y) {
    const draggableElements = [
        ...document.querySelectorAll(".draggable:not(.dragging)"),
    ];
    console.log(draggableElements)
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
