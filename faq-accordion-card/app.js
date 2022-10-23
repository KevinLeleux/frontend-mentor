const checkbox = document.getElementsByName("checkbox");
const accordion = document.getElementsByClassName("accordion");

for (let i = 0; i < checkbox.length; i++) {
    const element = checkbox[i];
    element.addEventListener("change", function () {
        if (accordion[i].classList.contains("active")) {
            accordion[i].classList.remove("active");
        } else {
            for (let j = 0; j < accordion.length; j++) {
                accordion[j].classList.remove("active");
            }
            accordion[i].classList.add("active");
        }
    });
}
