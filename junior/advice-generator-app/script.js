let temp = {};
let quotes = {};
let quotesArray = [];
const dice = document.querySelector(".dice");
const tempQuoteContainer = document.querySelector(".temp-quote-container");

dice.addEventListener("click", function () {
    tempQuoteContainer.classList.remove("translate");
    tempQuoteContainer.setAttribute("style", "z-index: 1;");
    createCard();
    setTimeout(() => {
        tempQuoteContainer.classList.add("translate");
    }, 0);
    setTimeout(() => {
        tempQuoteContainer.setAttribute("style", "z-index: -1;");
    }, 500);
});

const initialize = async () => {
    const quotesFetch = await (
        await fetch("https://api.adviceslip.com/advice/search/e")
    ).json();
    const arr = quotesFetch.slips;
    for (let index = 0; index < arr.length; index++) {
        quotes = Object.assign({
            id: arr[index].id,
            advice: arr[index].advice,
            date: arr[index].date,
        });
        quotesArray.push(quotes);
    }
    createCard();
};

function createCard() {
    let index = Math.floor(Math.random() * (quotesArray.length - 0) + 0);
    const h1 = document.querySelector(".title");
    h1.innerHTML = "";
    h1.insertAdjacentText("beforeend", "Advice #" + quotesArray[index].id);
    const quote = document.querySelector(".quote");
    quote.innerHTML = "";
    quote.insertAdjacentText("beforeend", quotesArray[index].advice);

    const tempH1 = document.querySelector(".temp-title");
    tempH1.innerHTML = "";
    tempH1.insertAdjacentText("beforeend", "Advice #" + temp.id);
    const tempQuote = document.querySelector(".temp-quote");
    tempQuote.innerHTML = "";
    tempQuote.insertAdjacentText("beforeend", temp.advice);

    temp = {
        id: quotesArray[index].id,
        advice: quotesArray[index].advice,
    };
}

initialize();
