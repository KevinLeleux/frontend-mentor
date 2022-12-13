const menu = document.querySelector(".menu-icon");
const menuClose = document.querySelector(".close-icon");
const links = document.querySelector(".links");
const aLinks = document.querySelectorAll(".menu-links");
const body = document.querySelector("body");

menu.addEventListener("click", function () {
    menu.classList.add("hidden");
    menuClose.classList.add("visible");
    links.classList.add("visible");
    body.classList.add("noscroll");
});

menuClose.addEventListener("click", function () {
    menu.classList.remove("hidden");
    menuClose.classList.remove("visible");
    links.classList.remove("visible");
    body.classList.remove("noscroll");
});

for (let i = 0; i < aLinks.length; i++) {
    aLinks[i].addEventListener("click", function () {
        menu.classList.remove("hidden");
        menuClose.classList.remove("visible");
        links.classList.remove("visible");
        body.classList.remove("noscroll");
    });
}
