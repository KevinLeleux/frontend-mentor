const form = document.querySelector("form");
const email = document.querySelector(".email");
const error = document.querySelector(".error");

form.addEventListener("input", function () {
    if (error.classList.contains("visible")) {
        error.classList.remove("visible");
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (email.value) {
        validateEmail(email.value);
    } else {
        error.classList.add("visible");
    }
});

function validateEmail(emailCheck) {
    if (error.classList.contains("visible")) {
        error.classList.remove("visible");
    }
    let validRegex =
        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
    if (!emailCheck.match(validRegex)) {
        error.classList.add("visible");
    }
}
