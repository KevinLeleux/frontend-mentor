const form = document.querySelector("form");
const email = document.querySelector(".email");
const error = document.querySelector(".error");
const errorImg = document.querySelector(".error-img");

form.addEventListener("input", function () {
    error.innerHTML = "";
    email.classList.remove("input-error");
    errorImg.classList.remove("visible");
});
form.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = document.querySelector(".email").value;
    if (!input) {
        errorImg.classList.add("visible");
        email.classList.add("input-error");
        error.innerHTML = "";
        error.insertAdjacentText("beforeend", "Email field is empty");
    } else {
        ValidateEmail(input);
    }
});

function ValidateEmail(input) {
    var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!input.match(validRegex)) {
        errorImg.classList.add("visible");
        email.classList.add("input-error");
        error.innerHTML = "";
        error.insertAdjacentText("beforeend", "Please provide a valid email");
        return false;
    }
}
