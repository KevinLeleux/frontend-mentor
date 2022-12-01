const dice = document.querySelector(".dice");
let temp = {};
const tempQuoteContainer = document.querySelector(".temp-quote-container");
tempQuoteContainer.setAttribute("style", "z-index: -1;");

dice.addEventListener("click", function () {
    const tempQuoteContainer = document.querySelector(".temp-quote-container");
    tempQuoteContainer.classList.remove("translate"); // reset animation
    tempQuoteContainer.setAttribute("style", "z-index: 1;");
    void tempQuoteContainer.offsetWidth;
    tempQuoteContainer.classList.add("translate");
    fetchData();
    setTimeout(function () {
        tempQuoteContainer.setAttribute("style", "z-index: -1;");
    }, 500);
});

async function fetchData() {
    const quotesApi = await (
        await fetch("https://api.adviceslip.com/advice")
    ).json();
    const h1 = document.querySelector(".title");
    h1.innerHTML = "";
    h1.insertAdjacentText("beforeend", "Advice #" + quotesApi.slip.id);
    const quote = document.querySelector(".quote");
    quote.innerHTML = "";
    quote.insertAdjacentText("beforeend", quotesApi.slip.advice);
    const tempH1 = document.querySelector(".temp-title");
    tempH1.innerHTML = "";
    tempH1.insertAdjacentText("beforeend", "Advice #" + temp.id);
    const tempQuote = document.querySelector(".temp-quote");
    tempQuote.innerHTML = "";
    tempQuote.insertAdjacentText("beforeend", temp.advice);

    temp = {
        id: quotesApi.slip.id,
        advice: quotesApi.slip.advice,
    };
}

fetchData();
