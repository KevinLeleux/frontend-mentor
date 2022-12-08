const title = document.querySelector(".title-bw");
const blackDiv = document.querySelector(".black-content");

const myObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        var bodyDist = document.body.getBoundingClientRect(),
            elemDist = title.getBoundingClientRect(),
            offset = elemDist.left - bodyDist.left;
        width = (entry.contentRect.width - offset) / 10;
        title.setAttribute(
            "style",
            "background-image: linear-gradient(90deg, #fff " +
                width +
                "rem, #fff 0, #151515 0, #151515);"
        );
    });
});

myObserver.observe(blackDiv);
/* myObserver.disconnect();
 */
