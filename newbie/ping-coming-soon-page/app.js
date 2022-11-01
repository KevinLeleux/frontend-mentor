const form = document.querySelector("form");
const email = document.querySelector(".email");
const span = document.querySelector(".error-msg");

form.addEventListener("input", function () {
    if (email.value) {
        email.classList.remove("error");
        span.innerHTML = "";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (email.value) {
        validateEmail(email.value);
    }
});

function validateEmail(emailCheck) {
    span.innerHTML = "";
    let validRegex =
        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
    if (!emailCheck.match(validRegex)) {
        span.insertAdjacentText(
            "beforeend",
            "Please provide a valid email address"
        );
        email.classList.add("error");
    }
}
