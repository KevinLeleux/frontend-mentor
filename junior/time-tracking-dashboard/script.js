const links = document.querySelectorAll(".time-link");
const current = document.querySelectorAll(".current");
const previous = document.querySelectorAll(".previous");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
        if (!links[i].classList.contains("active")) {
            for (let k = 0; k < links.length; k++) {
                links[k].classList.remove("active");
            }
            links[i].classList.add("active");
            const time = links[i].id;
            getData(time);
        }
    });
}

async function getData(time) {
    const data = await (await fetch("data.json")).json();
    for (let j = 0; j < data.length; j++) {
        const element = data[j];
        const currentSpan = current[j];
        const previousSpan = previous[j];
        currentSpan.innerHTML = "";
        if (element.timeframes[time].current > 1) {
            currentSpan.insertAdjacentText(
                "beforeend",
                element.timeframes[time].current + "hrs"
            );
        } else {
            currentSpan.insertAdjacentText(
                "beforeend",
                element.timeframes[time].current + "hr"
            );
        }
        const lastTime = {
            daily: "day",
            weekly: "week",
            monthly: "month",
        };
        previousSpan.innerHTML = "";
        if (element.timeframes[time].previous > 1) {
            previousSpan.insertAdjacentText(
                "beforeend",
                "Last " +
                    lastTime[time] +
                    " - " +
                    element.timeframes[time].previous +
                    "hrs"
            );
        } else {
            previousSpan.insertAdjacentText(
                "beforeend",
                "Last " +
                    lastTime[time] +
                    " - " +
                    element.timeframes[time].previous +
                    "hr"
            );
        }
    }
}
