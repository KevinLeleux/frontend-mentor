const cardHolderName = document.querySelector(".cardholdername");
const cardNumber = document.querySelector(".cardnumber");
const cardMonth = document.querySelector(".month");
const cardYear = document.querySelector(".year");
const ccv = document.querySelector(".ccv-input");

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
            .replace(/[^\dA-Z]/g, "")
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
