const shareContainer = document.querySelector(".share-container");
const shareIcon = document.querySelector(".share-icon");

shareIcon.addEventListener("click", function () {
    if (shareContainer.classList.contains("visible")) {
        shareContainer.classList.remove("visible");
        shareIcon.classList.remove("visible")
    } else {
        shareContainer.classList.add("visible");
        shareIcon.classList.add("visible");
    }
});
