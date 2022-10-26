const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    try {
        const value = document.querySelector(
            'input[name="rating"]:checked'
        ).value;
        const modal = document.querySelector(".modal");
        modal.classList.add("visible");
        const rating = document.querySelector(".rating-number");
        rating.insertAdjacentText("beforeend", value);
    } catch {
        console.log("Erreur: Veuillez selectionner un numéro");
    }
});
