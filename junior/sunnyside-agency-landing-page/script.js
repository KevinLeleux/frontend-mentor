const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const links = document.querySelectorAll("li");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        if (menu.classList.contains("visible")) {
            menu.classList.remove("visible");
        }
    });
}

hamburger.addEventListener("click", function () {
    if (menu.classList.contains("visible")) {
        menu.classList.remove("visible");
    } else {
        menu.classList.add("visible");
    }
});
