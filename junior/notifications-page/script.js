const notificationsNumber = document.querySelector(".notifications-number");
const unreadArticles = document.querySelectorAll(".unread");
const articles = document.querySelectorAll("article");
const readAll = document.querySelector(".read-all");

notificationsNumber.innerHTML = unreadArticles.length;

for (let i = 0; i < articles.length; i++) {
    articles[i].addEventListener("click", function () {
        check(i);
    });
}

readAll.addEventListener("click", function () {
    if (document.querySelectorAll(".unread").length > 0) {
        for (let i = 0; i < articles.length; i++) {
            check(i);
        }
    }
});

function check(i) {
    if (articles[i].classList.contains("unread")) {
        articles[i].classList.remove("unread");
        notificationsNumber.innerHTML =
            document.querySelectorAll(".unread").length;
    }
}
