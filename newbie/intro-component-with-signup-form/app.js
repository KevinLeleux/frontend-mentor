const form = document.querySelector("form");
const firstname = document.querySelector(".firstname");
const lastname = document.querySelector(".lastname");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

const input = [firstname, lastname, email, password];

form.addEventListener("input", function () {
    for (let i = 0; i < input.length; i++) {
        if (input[i].value) {
            if (input[i].classList.contains("error")) {
                input[i].classList.remove("error");
                const span = document.querySelector(
                    "." + input[i].classList[0] + "-span"
                );
                span.innerHTML = "";
            }
        }
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    for (let i = 0; i < input.length; i++) {
        if (input[i].value) {
            input[i].classList.remove("error");
        } else {
            input[i].classList.add("error");
            const span = document.querySelector(
                "." + input[i].classList[0] + "-span"
            );
            span.innerHTML = "";
            const title = {
                firstname: "First Name",
                lastname: "Last Name",
                email: "Email",
                password: "Password",
            };
            span.insertAdjacentText(
                "beforeend",
                title[input[i].classList[0]] + " cannot be empty"
            );
        }
    }
    if (email.value) {
        const emailCheck = email.value;
        validateEmail(emailCheck);
    }
});

function validateEmail(emailCheck) {
    let validRegex =
        /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/gm;
    if (!emailCheck.match(validRegex)) {
        const span = document.querySelector(".email-span");
        span.insertAdjacentText("beforeend", "Looks like this is not an email");
        email.classList.add("error");
    }
}
