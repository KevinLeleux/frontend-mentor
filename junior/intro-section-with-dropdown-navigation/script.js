const arrows = document.querySelectorAll(".arrow");
const navDropdown = document.querySelectorAll(".nav-dropdown");
const links = document.querySelectorAll(".links");
const navMenu = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".menu-close-icon");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

menuIcon.addEventListener("click", function () {
    closeIcon.classList.remove("hidden");
    menuIcon.classList.add("hidden");
    overlay.classList.remove("hidden");
    navMenu.classList.add("visible");
    body.setAttribute("style", "overflow-y:hidden");
});

closeIcon.addEventListener("click", function () {
    closeIcon.classList.add("hidden");
    menuIcon.classList.remove("hidden");
    overlay.classList.add("hidden");
    navMenu.classList.remove("visible");
    body.removeAttribute("style");
});

overlay.addEventListener("click", function () {
    closeIcon.classList.add("hidden");
    menuIcon.classList.remove("hidden");
    overlay.classList.add("hidden");
    navMenu.classList.remove("visible");
    body.removeAttribute("style");
});

for (let i = 0; i < navDropdown.length; i++) {
    navDropdown[i].addEventListener("click", function () {
        if (links[i].classList.contains("hidden")) {
            links[i].classList.remove("hidden");
            arrows[i].src = "images/icon-arrow-up.svg";
        } else {
            links[i].classList.add("hidden");
            arrows[i].src = "images/icon-arrow-down.svg";
        }
    });
}
