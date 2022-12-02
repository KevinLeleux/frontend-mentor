const setTheme = (theme) => (document.documentElement.className = theme);
const buttons = document.querySelectorAll(".theme");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", ({ target }) => {
        setTheme(buttons[i].getAttribute("value"));
        
    });
}
