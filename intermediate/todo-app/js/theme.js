function setTheme(theme) {
    document.documentElement.className = theme;
}

const icon = document.querySelectorAll(".theme");
icon.forEach((themeIcon) => {
    themeIcon.addEventListener("click", function () {
        setTheme(themeIcon.getAttribute("value"));
        window.localStorage.setItem("color", themeIcon.getAttribute("value"));
    });
});

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
