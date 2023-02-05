const prevArrow = document.querySelectorAll(".prev-arrow");
const nextArrow = document.querySelectorAll(".next-arrow");
const slides = document.querySelectorAll(".slides");
const firstSlide = document.querySelector(".slide1");
const secondSlide = document.querySelector(".slide2");

let current = 0;
let max = slides.length;

for (let index = 0; index < nextArrow.length; index++) {
    nextArrow[index].addEventListener("click", function () {
        slideNext();
    });
}

for (let index = 0; index < prevArrow.length; index++) {
    prevArrow[index].addEventListener("click", function () {
        slidePrev();
    });
}

document.addEventListener("keydown", function (event) {
    event.preventDefault();
    const key = event.key;
    switch (key) {
        case "ArrowLeft":
            slidePrev();
            break;
        case "ArrowRight":
            slideNext();
            break;
    }
});

function slideNext() {
    current++;
    if (current >= max) {
        current = 0;
        firstSlide.classList.remove("hidden");
        secondSlide.classList.add("hidden");
    } else {
        firstSlide.classList.add("hidden");
        secondSlide.classList.remove("hidden");
    }
}

function slidePrev() {
    current--;
    if (current <= 0) {
        current = 2;
        firstSlide.classList.add("hidden");
        secondSlide.classList.remove("hidden");
    } else {
        firstSlide.classList.remove("hidden");
        secondSlide.classList.add("hidden");
    }
}
