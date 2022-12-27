const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const customInput = document.querySelector(".custom-input");
const tipAmount = document.querySelector(".tip-amount-span");
const totalAmount = document.querySelector(".total-amount-span");
const resetBtn = document.querySelector(".reset-btn");
const errorMsg = document.querySelector(".error-msg");
const btn = document.querySelectorAll(".btn");

billInput.addEventListener("focus", function () {
    billInput.setAttribute("placeholder", "");
});

billInput.addEventListener("blur", function () {
    billInput.setAttribute("placeholder", "0");
});

peopleInput.addEventListener("focus", function () {
    peopleInput.setAttribute("placeholder", "");
});

peopleInput.addEventListener("blur", function () {
    peopleInput.setAttribute("placeholder", "0");
});

customInput.addEventListener("focus", function () {
    customInput.setAttribute("placeholder", "");
});

customInput.addEventListener("blur", function () {
    customInput.setAttribute("placeholder", "custom");
});

resetBtn.addEventListener("click", function () {
    billInput.value = "";
    peopleInput.value = "";
    customInput.value = "";
    tipAmount.innerHTML = "";
    tipAmount.insertAdjacentText("beforeend", "$0.00");
    totalAmount.innerHTML = "";
    totalAmount.insertAdjacentText("beforeend", "$0.00");
    for (let i = 0; i < btn.length; i++) {
        btn[i].classList.remove("active");
    }
    checkReset();
});

customInput.addEventListener("click", function () {
    for (let i = 0; i < btn.length; i++) {
        btn[i].classList.remove("active");
    }
});

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
        for (let j = 0; j < btn.length; j++) {
            btn[j].classList.remove("active");
        }
        btn[i].classList.add("active");
        customInput.value = "";
        let data = btn[i].value;
        calc(data);
    });
}

customInput.addEventListener("input", function () {
    checkReset();
    let data = customInput.value;
    calc(data);
});

billInput.addEventListener("input", function () {
    checkReset();
    for (let i = 0; i < btn.length; i++) {
        if (btn[i].classList.contains("active")) {
            let data = btn[i].value;
            console.log(btn[i].value);
            calc(data);
        } else {
            let data = customInput.value;
            calc(data);
        }
    }
});

peopleInput.addEventListener("input", function () {
    for (let i = 0; i < btn.length; i++) {
        btn[i].classList.remove("active");
    }
    let data = customInput.value;
    calc(data);
});

function calc(data) {
    checkPeople();
    checkReset();
    const tipTotal = (billInput.value * data) / 100;
    let tipPerPerson = tipTotal / parseInt(peopleInput.value);
    const totalPerPerson = billInput.value / peopleInput.value + tipPerPerson;
    tipAmount.innerHTML = "";
    if (!Number.isNaN(tipPerPerson)) {
        tipAmount.insertAdjacentText(
            "beforeend",
            "$" + (Math.round(tipPerPerson * 100) / 100).toFixed(2)
        );
    } else {
        tipAmount.insertAdjacentText("beforeend", "$0.00");
    }
    totalAmount.innerHTML = "";
    if (!Number.isNaN(totalPerPerson)) {
        totalAmount.insertAdjacentText(
            "beforeend",
            "$" + (Math.round(totalPerPerson * 100) / 100).toFixed(2)
        );
    } else {
        totalAmount.insertAdjacentText("beforeend", "$0.00");
    }
}

function checkPeople() {
    errorMsg.classList.add("hidden");
    if (!peopleInput.value || peopleInput.value == "0") {
        errorMsg.classList.remove("hidden");
    }
}

function checkReset() {
    if (peopleInput.value == 0 || billInput.value == 0) {
        resetBtn.classList.add("hidden-btn");
        resetBtn.disabled = true;
    } else {
        resetBtn.classList.remove("hidden-btn");
        resetBtn.disabled = false;
    }
}

checkReset();
