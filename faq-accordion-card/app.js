const checkboxNode = document.getElementsByName("checkbox");
const checkbox = Array.from(checkboxNode);
console.log(checkbox);

for (i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("change", function () {
        for (i = 0; i < checkbox.length; i++) {
            checkbox[i].classList.remove("active")
        }
        this.classList.toggle("active");
    });
}
