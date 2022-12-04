const setTheme = (theme) => (document.documentElement.className = theme);

if (!window.localStorage.getItem("color")) {
    window.localStorage.setItem(
        "color",
        document.documentElement.classList.value
    );
} else {
    setTheme(window.localStorage.getItem("color"));
}

const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");
if (darkScheme.matches) {
    setTheme("dark");
}

darkScheme.addEventListener("change", function (e) {
    const colorScheme = e.matches ? "dark" : "light";
    setTheme(colorScheme);
    window.localStorage.setItem("color", colorScheme);
});

const theme = document.querySelectorAll(".theme");
for (let i = 0; i < theme.length; i++) {
    theme[i].addEventListener("click", () => {
        setTheme(theme[i].getAttribute("value"));
        window.localStorage.setItem("color", theme[i].getAttribute("value"));
    });
}

const form = document.querySelector("form");
const input = document.querySelector(".input");
const error = document.querySelector(".error-msg");

input.addEventListener("input", function () {
    if (error.classList.contains("visible")) {
        error.classList.remove("visible");
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    fetchData(input.value);
});

const fetchData = async (user) => {
    data = await (await fetch(`https://api.github.com/users/${user}`)).json();
    if (!data.message) {
        createProfileCard(data);
    } else {
        error.classList.add("visible");
    }
};

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const avatar = document.querySelector(".avatar-img");
const username = document.querySelector(".username");
const joined = document.querySelector(".joined");
const usernameLink = document.querySelector(".username-link");
const bio = document.querySelector(".bio");
const repos = document.querySelector(".repos-nb");
const followers = document.querySelector(".followers-nb");
const following = document.querySelector(".following-nb");

const locations = document.querySelector(".loc");
const website = document.querySelector(".web");
const twitter = document.querySelector(".twit");
const company = document.querySelector(".git");

const createProfileCard = (data) => {
    avatar.setAttribute("src", data.avatar_url);
    username.innerText = "";
    if (!data.name) {
        username.insertAdjacentText("afterbegin", data.login);
    } else {
        username.insertAdjacentText("afterbegin", data.name);
    }
    const date = data.created_at.split("T").shift().split("-");
    const month = parseInt(date[1], "10") - 1;
    joined.innerText = "";
    joined.insertAdjacentText(
        "afterbegin",
        "Joined " + date[2] + " " + months[month] + " " + date[0]
    );
    usernameLink.innerText = "";
    usernameLink.setAttribute("href", data.html_url);
    usernameLink.insertAdjacentText("afterbegin", "@" + data.login);
    bio.innerText = "";
    if (!data.bio) {
        bio.insertAdjacentText("afterbegin", "This profile has no bio");
    } else {
        bio.insertAdjacentText("afterbegin", data.bio);
    }
    repos.innerHTML = "";
    repos.insertAdjacentText("afterbegin", data.public_repos);
    followers.innerHTML = "";
    followers.insertAdjacentText("afterbegin", data.followers);
    following.innerHTML = "";
    following.insertAdjacentText("afterbegin", data.following);
    locations.innerHTML = "";
    if (!data.location) {
        document.querySelector(".location").classList.add("empty");
        locations.insertAdjacentText("afterbegin", "Not available");
    } else {
        document.querySelector(".location").classList.remove("empty");
        locations.insertAdjacentText("afterbegin", data.location);
    }
    website.innerHTML = "";
    if (!data.blog) {
        document.querySelector(".website").classList.add("empty");
        website.setAttribute("href", "#");
        website.insertAdjacentText("afterbegin", "Not available");
    } else {
        document.querySelector(".website").classList.remove("empty");
        website.setAttribute("href", data.blog);
        website.insertAdjacentText("afterbegin", data.blog);
    }
    twitter.innerHTML = "";
    if (!data.twitter_username) {
        document.querySelector(".twitter").classList.add("empty");
        twitter.setAttribute("href", "#");
        twitter.insertAdjacentText("afterbegin", "Not available");
    } else {
        document.querySelector(".twitter").classList.remove("empty");
        twitter.setAttribute(
            "href",
            "https://twitter.com/" + data.twitter_username
        );
        twitter.insertAdjacentText("afterbegin", data.twitter_username);
    }
    company.innerHTML = "";
    if (!data.company) {
        document.querySelector(".github").classList.add("empty");
        company.insertAdjacentText("afterbegin", "Not available");
    } else {
        document.querySelector(".github").classList.remove("empty");
        company.insertAdjacentText("afterbegin", data.company);
    }
};

fetchData("octocat");
