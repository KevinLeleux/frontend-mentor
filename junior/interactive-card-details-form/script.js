const cardHolderName = document.querySelector(".cardholdername");
const cardNumber = document.querySelector(".cardnumber");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".year");
const ccv = document.querySelector(".ccv-input");
const form = document.querySelector("form");

const cardFrontName = document.querySelector(".cardfront-name");
const cardFrontNumber = document.querySelector(".cardfront-number");
const cardFrontMonth = document.querySelector(".cardfront-month");
const cardFrontYear = document.querySelector(".cardfront-year");
const cardfrontCcv = document.querySelector(".cardfront-ccv");

cardHolderName.addEventListener("input", function () {
    const input = cardHolderName.value;
    if (!input) {
        cardFrontName.innerHTML = "Jane Appleseed";
    } else {
        if (input.match(/^.{0,30}$/gm)) {
            cardFrontName.innerHTML = input;
        }
    }
});

cardNumber.addEventListener("input", function (e) {
    let input = cardNumber.value;
    if (!input) {
        cardFrontNumber.innerHTML = "0000 0000 0000 0000";
    } else {
        let field = e.target;
        let position = field.selectionEnd;
        let length = field.value.length;

        field.value = field.value
            .replace(/[^\da-zA-Z&é"'(§è!çà)-]/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim();

        cardFrontNumber.innerHTML = field.value;

        field.selectionEnd = position +=
            field.value.charAt(position - 1) === " " &&
            field.value.charAt(length - 1) === " "
                ? 1
                : 0;
    }
});

cardMonth.addEventListener("input", function () {
    let input = cardMonth.value;
    if (!input) {
        cardFrontMonth.innerHTML = "00";
    } else {
        if (input.match(/^.{0,1}$/gm)) {
            cardFrontMonth.innerHTML = "0" + input;
        } else {
            if (input > 11) {
                cardFrontMonth.innerHTML = "12";
                document.querySelector(".month").value = "12";
            } else {
                cardFrontMonth.innerHTML = input;
            }
        }
    }
});

cardYear.addEventListener("input", function () {
    let input = cardYear.value;
    if (!input) {
        cardFrontYear.innerHTML = "00";
    } else {
        if (input.match(/^.{0,1}$/gm)) {
            cardFrontYear.innerHTML = "0" + input;
        } else {
            cardFrontYear.innerHTML = input;
        }
    }
});

ccv.addEventListener("input", function () {
    const input = ccv.value;
    if (!input) {
        cardfrontCcv.innerHTML = "000";
    } else {
        if (input.match(/^.{0,3}$/gm)) {
            cardfrontCcv.innerHTML = input;
        }
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const allErrors = document.querySelectorAll(".error");
    for (let i = 0; i < allErrors.length; i++) {
        allErrors[i].classList.remove("error");
    }
    let inputCardName = cardHolderName.value;
    let inputCardNumber = cardNumber.value;
    let inputCardMonth = cardMonth.value;
    let inputCardYear = cardYear.value;
    let inputCardCcv = ccv.value;

    const nameRegex = inputCardName.match(
        /^(?:[a-zA-Záéíóúü\.]{2,30}\s?){1,6}$/gm
    );
    const numberRegex = inputCardNumber.match(
        /(\d{4}[-. ]?){4}|\d{4}[-. ]?\d{6}[-. ]?\d{5}/g
    );
    const monthRegex = inputCardMonth.match(/^(0?[1-9]|1[012])$/g);
    const yearRegex = inputCardYear.match(/^\d{1,2}$/g);
    const ccvRegex = inputCardCcv.match(/^\d{3}$/g);

    if (nameRegex && numberRegex && monthRegex && yearRegex && ccvRegex) {
        const thanks = document.querySelector(".thanks");
        thanks.classList.add("visible");
        form.classList.add("notvisible");
    } else {
        if (!nameRegex) {
            cardHolderName.classList.add("error");
            document.querySelector(".name-msg").classList.add("error");
        }
        if (!numberRegex) {
            const errorNumber = document.querySelector(".number-msg");
            errorNumber.innerHTML = "";
            errorNumber.classList.add("error");
            cardNumber.classList.add("error");
            if (!inputCardNumber.match(/^.{19}$/gm)) {
                errorNumber.insertAdjacentText(
                    "beforeend",
                    "16 digits are needed"
                );
            } else {
                errorNumber.insertAdjacentText(
                    "beforeend",
                    "Wrong format, numbers only"
                );
            }
        }
        if (!monthRegex) {
            const errorDate = document.querySelector(".date-msg");
            errorDate.innerHTML = "";
            errorDate.classList.add("error");
            cardMonth.classList.add("error");
            if (inputCardMonth == "0" || inputCardMonth == "00") {
                errorDate.insertAdjacentText(
                    "beforeend",
                    "Must be greater than 0"
                );
            }
            if (!inputCardMonth.match(/^\d$/g)) {
                if (!inputCardMonth) {
                    errorDate.insertAdjacentText("beforeend", "Can't be blank");
                } else {
                    errorDate.insertAdjacentText("beforeend", "Numbers only");
                }
            }
        }

        if (!yearRegex) {
            const errorDate = document.querySelector(".date-msg");
            errorDate.innerHTML = "";
            errorDate.classList.add("error");
            cardYear.classList.add("error");
            if (!inputCardYear.match(/^\d$/g)) {
                if (!inputCardYear) {
                    errorDate.insertAdjacentText("beforeend", "Can't be blank");
                } else {
                    errorDate.insertAdjacentText("beforeend", "Numbers only");
                }
            }
        }
        if (!ccvRegex) {
            const errorCcv = document.querySelector(".ccv-msg");
            errorCcv.innerHTML = "";
            errorCcv.classList.add("error");
            ccv.classList.add("error");
            if (!inputCardCcv.match(/^\d$/g)) {
                if (!inputCardCcv) {
                    errorCcv.insertAdjacentText("beforeend", "Can't be blank");
                } else {
                    errorCcv.insertAdjacentText("beforeend", "Numbers only");
                }
            }
        }
    }
});
