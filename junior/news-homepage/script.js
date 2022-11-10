const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const links = document.querySelector(".links");
const body = document.querySelector("body");
const aLinks = document.getElementsByTagName("a");
console.log(aLinks);

hamburger.addEventListener("click", function () {
    body.classList.add("lock-scroll");
    links.classList.add("visible")
    close.style.visibility = "visible";
    hamburger.style.visibility = "hidden";
});

close.addEventListener("click", function () {
    body.classList.remove("lock-scroll");
    links.classList.remove("visible");
    close.style.visibility = "hidden";
    hamburger.style.visibility = "visible";
});

for (let index = 0; index < aLinks.length; index++) {
    aLinks[index].addEventListener("click", function () {
        body.classList.remove("lock-scroll");
    links.classList.remove("visible");
        close.style.visibility = "hidden";
        hamburger.style.visibility = "visible";
    });
}
