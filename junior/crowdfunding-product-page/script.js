const backBtn = document.querySelector(".back-btn");
const overlay = document.querySelector(".overlay");
const projectModal = document.querySelector(".back-this-project");
const thanksModal = document.querySelector(".thanks-modal");
const radio = document.querySelectorAll(".radio");
const enterPledge = document.querySelectorAll(".enter-pledge");
const pledges = document.querySelectorAll(".modal-pledge");
const rewardBtns = document.querySelectorAll(".reward");
const continueBtn = document.querySelectorAll(".continue");
const gotItBtn = document.querySelector(".got-it");
const amount = document.querySelectorAll(".amount");
const closeModal = document.querySelector(".close-modal");

backBtn.addEventListener("click", function () {
    overlay.classList.remove("hidden");
    projectModal.classList.remove("hidden");
    for (let j = 0; j < enterPledge.length; j++) {
        enterPledge[j].classList.add("hidden");
        pledges[j].classList.remove("active");
    }
    radio[0].setAttribute("checked", "checked");
    enterPledge[0].classList.remove("hidden");
    pledges[0].classList.add("active");
});

overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    projectModal.classList.add("hidden");
    for (let j = 0; j < enterPledge.length; j++) {
        enterPledge[j].classList.add("hidden");
        pledges[j].classList.remove("active");
        radio[j].removeAttribute("checked", "checked");
    }
});

closeModal.addEventListener("click", function () {
    overlay.classList.add("hidden");
    projectModal.classList.add("hidden");
    for (let j = 0; j < enterPledge.length; j++) {
        enterPledge[j].classList.add("hidden");
        pledges[j].classList.remove("active");
        radio[j].removeAttribute("checked", "checked");
    }
});

for (let index = 0; index < radio.length; index++) {
    radio[index].addEventListener("change", function () {
        for (let j = 0; j < enterPledge.length; j++) {
            enterPledge[j].classList.add("hidden");
            pledges[j].classList.remove("active");
        }
        enterPledge[radio[index].id].classList.remove("hidden");
        pledges[radio[index].id].classList.add("active");
    });
}

for (let i = 0; i < rewardBtns.length; i++) {
    rewardBtns[i].addEventListener("click", function () {
        for (let j = 0; j < enterPledge.length; j++) {
            enterPledge[j].classList.add("hidden");
            pledges[j].classList.remove("active");
            radio[j].removeAttribute("checked", "checked");
        }
        if (!rewardBtns[i].classList.contains("out")) {
            radio[rewardBtns[i].value].setAttribute("checked", "checked");
            enterPledge[rewardBtns[i].value].classList.remove("hidden");
            pledges[rewardBtns[i].value].classList.add("active");
            overlay.classList.remove("hidden");
            projectModal.classList.remove("hidden");
        }
    });
}

for (let index = 0; index < continueBtn.length; index++) {
    continueBtn[index].addEventListener("click", function () {
        let continueId = continueBtn[index].value;
        let placeholder = parseInt(
            amount[continueId].getAttribute("placeholder"),
            10
        );
        if (amount[continueId].value >= placeholder) {
            projectModal.classList.add("hidden");
            thanksModal.classList.remove("hidden");
        } else {
            document.documentElement.style.setProperty(
                "--color",
                "hsla(13, 70%, 61%, 1)"
            );
            amount[continueId].classList.add("error");
            console.log("not ok");
        }
    });
}

gotItBtn.addEventListener("click", function () {
    overlay.classList.add("hidden");
    thanksModal.classList.add("hidden");
});

/* Remove the red border in case of low amount
 */
for (let index = 0; index < amount.length; index++) {
    amount[index].addEventListener("click", function () {
        for (let index = 0; index < amount.length; index++) {
            document.documentElement.style.setProperty(
                "--color",
                "hsla(0, 0%, 0%, 0.25)"
            );
            amount[index].classList.remove("error");
        }
    });
}

/* Local storage */

const bookmarkBtn = document.querySelector(".bookmark-btn");
const span = document.querySelector(".bookmark-btn span");
if (window.localStorage.getItem("bookmarked")) {
    bookmarkBtn.classList.add("bookmarked");
    span.innerText = "Bookmarked";
}

bookmarkBtn.addEventListener("click", function () {
    if (window.localStorage.getItem("bookmarked")) {
        window.localStorage.removeItem("bookmarked");
        bookmarkBtn.classList.remove("bookmarked");
        span.innerText = "Bookmark";
    } else {
        window.localStorage.setItem("bookmarked", true);
        bookmarkBtn.classList.add("bookmarked");
        span.innerText = "Bookmarked";
    }
});
