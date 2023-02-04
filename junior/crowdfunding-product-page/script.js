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
const leftSpan = document.querySelectorAll(".pledge-left");
const pledgeInactive = document.querySelectorAll(".pledge");
const number = document.querySelectorAll(".number");
const hamburger = document.querySelector(".hamburger");
const hamburgerClose = document.querySelector(".hamburger-close");
const navbar = document.querySelector(".nav-bar");
const aHref = document.querySelectorAll(".nav-bar a");

let left = [101, 64, 0];

/* Hamburger Menu management */
hamburger.addEventListener("click", function () {
    overlay.classList.remove("hidden");
    navbar.classList.add("visible");
    hamburger.classList.add("hidden");
    hamburgerClose.classList.add("visible");
    document.querySelector("body").classList.add("scroll-lock");
});

hamburgerClose.addEventListener("click", function () {
    overlay.classList.add("hidden");
    navbar.classList.remove("visible");
    hamburger.classList.remove("hidden");
    hamburgerClose.classList.remove("visible");
    document.querySelector("body").classList.remove("scroll-lock");
});

for (let index = 0; index < aHref.length; index++) {
    aHref[index].addEventListener("click", function () {
        overlay.classList.add("hidden");
        navbar.classList.remove("visible");
        hamburger.classList.remove("hidden");
        hamburgerClose.classList.remove("visible");
        document.querySelector("body").classList.remove("scroll-lock");
    });
}

backBtn.addEventListener("click", function () {
    overlay.classList.remove("hidden");
    projectModal.classList.remove("hidden");
    for (let j = 0; j < enterPledge.length; j++) {
        enterPledge[j].classList.add("hidden");
        pledges[j].classList.remove("active");
    }
    radio[0].click();
    pledges[0].scrollIntoView({ block: "center", behavior: "smooth" });
    enterPledge[0].classList.remove("hidden");
    pledges[0].classList.add("active");
});

overlay.addEventListener("click", function () {
    overlay.classList.add("hidden");
    projectModal.classList.add("hidden");
    thanksModal.classList.add("hidden");
    navbar.classList.remove("visible");
    hamburger.classList.remove("hidden");
    hamburgerClose.classList.remove("visible");
    document.querySelector("body").classList.remove("scroll-lock");
    for (let j = 0; j < enterPledge.length; j++) {
        enterPledge[j].classList.add("hidden");
        pledges[j].classList.remove("active");
    }
});

closeModal.addEventListener("click", function () {
    overlay.classList.add("hidden");
    projectModal.classList.add("hidden");
    for (let j = 0; j < enterPledge.length; j++) {
        enterPledge[j].classList.add("hidden");
        pledges[j].classList.remove("active");
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
        }
        if (!rewardBtns[i].classList.contains("out")) {
            radio[rewardBtns[i].value].click();
            enterPledge[rewardBtns[i].value].classList.remove("hidden");
            pledges[rewardBtns[i].value].classList.add("active");
            overlay.classList.remove("hidden");
            projectModal.classList.remove("hidden");
            pledges[rewardBtns[i].value].scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
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
            let value = parseInt(amount[continueId].value);
            if (value > 0) {
                let backedTotal = parseInt(
                    window.localStorage.getItem("backed")
                );
                window.localStorage.setItem("backed", backedTotal + value);
            }
            let backersTotal = parseInt(window.localStorage.getItem("backers"));
            window.localStorage.setItem("backers", backersTotal + 1);
            price();
            backers();
            width();
            thanksModal.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });

            if (continueId > 0) {
                let leftArray = JSON.parse(window.localStorage.getItem("left"));
                leftArray[continueId - 1] = leftArray[continueId - 1] - 1;
                console.log(leftArray);
                window.localStorage.setItem("left", JSON.stringify(leftArray));
                pledgeLeft();
            }
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

function init() {
    if (!window.localStorage.getItem("goal")) {
        window.localStorage.setItem("goal", 100000);
    }

    if (!window.localStorage.getItem("backed")) {
        window.localStorage.setItem("backed", 89914);
    }

    if (!window.localStorage.getItem("backers")) {
        window.localStorage.setItem("backers", 5007);
    }

    if (!window.localStorage.getItem("left")) {
        window.localStorage.setItem("left", JSON.stringify(left));
    }

    price();
    backers();
    pledgeLeft();
    width();

    const goal = formatNumber(window.localStorage.getItem("goal"));
    const goalSpan = document.querySelector(".goal");

    goalSpan.innerHTML = "";
    goalSpan.insertAdjacentText("beforeend", "of $" + goal + " backed");

    if (!window.localStorage.getItem("timeleft")) {
        var date = new Date();
        var date1 = date.getTime();
        var date2 = date.getTime() + 1000 * 3600 * 24 * 56;
        var difference = Math.ceil((date2 - date1) / (1000 * 3600 * 24));
        window.localStorage.setItem("timeleft", difference);
        window.localStorage.setItem("enddate", date2);
    } else {
        var date = new Date();
        var date1 = date.getTime();
        var date2 = window.localStorage.getItem("enddate");
        var difference = Math.ceil((date2 - date1) / (1000 * 3600 * 24));
        window.localStorage.setItem("timeleft", difference);
    }

    var timeLeft = formatNumber(window.localStorage.getItem("timeleft"));
    if (timeLeft <= 0) {
        timeLeft = 0;
    }
    const timeLeftSpan = document.querySelector(".timeleft");
    timeLeftSpan.innerHTML = "";
    timeLeftSpan.insertAdjacentText("beforeend", timeLeft);
}

function price() {
    const price = formatNumber(window.localStorage.getItem("backed"));
    const backersPrice = document.querySelector(".backers-price");
    backersPrice.innerHTML = "";
    backersPrice.insertAdjacentText("beforeend", "$" + price);
}

function backers() {
    const backers = formatNumber(window.localStorage.getItem("backers"));
    const backersNum = document.querySelector(".backers-num");

    backersNum.innerHTML = "";
    backersNum.insertAdjacentText("beforeend", backers);
}

function pledgeLeft() {
    let leftArray = JSON.parse(window.localStorage.getItem("left"));
    for (i = 0; i < leftArray.length; i++) {
        if (leftArray[i] == 0) {
            rewardBtns[i].classList.add("out");
            pledgeInactive[i].classList.add("inactive");
            pledges[i + 1].classList.add("out");
            rewardBtns[i].innerText = "";
            rewardBtns[i].insertAdjacentText("beforeend", "Out of stock");
        }
        leftSpan[i].innerText = "";
        leftSpan[i].insertAdjacentText("beforeend", leftArray[i]);
        number[i].innerText = "";
        number[i].insertAdjacentText("beforeend", leftArray[i]);
    }
}

function width() {
    let width =
        (window.localStorage.getItem("backed") /
            window.localStorage.getItem("goal")) *
        100;
    if (width >= 100) {
        width = 100;
    }
    const progressBar = document.querySelector(".progress-green-bar");
    progressBar.setAttribute("style", "width: " + width + "%");
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

init();
