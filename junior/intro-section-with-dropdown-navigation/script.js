const arrows = document.querySelectorAll(".arrow");
const navDropdown = document.querySelectorAll(".nav-dropdown");
const links = document.querySelectorAll(".links");

for (let i = 0; i < navDropdown.length; i++) {
    navDropdown[i].addEventListener("click", function () {
        if (links[i].classList.contains("hidden")) {
            for (let i = 0; i < links.length; i++) {
                links[i].classList.add("hidden");
            }
            links[i].classList.remove("hidden");
            arrows[i].src = "images/icon-arrow-up.svg";
        } else {
            links[i].classList.add("hidden");
            arrows[i].src = "images/icon-arrow-down.svg";
        }
    });
}
