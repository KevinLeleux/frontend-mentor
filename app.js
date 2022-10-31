const github = "https://github.com/BeholderGit/frontend-mentor/tree/master/";
const main = document.getElementById("main");
const levelName = {
    1: ["newbie", "blue"],

    2: ["junior", "green"],
    3: ["intermediate", "orange"],
    4: ["advanced", "dark-orange"],
    5: ["guru", "red"],
};

const getData = async () => {
    const data = await (await fetch("db.json")).json();
    const challenges = data.challenges;
    for (let index = 0; index < challenges.length; index++) {
        const data = challenges[index];
        createCard(data);
    }
};

const createCard = (data) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const cardImage = document.createElement("div");
    cardImage.setAttribute("class", "card-image");
    const urlImage = document.createElement("a");
    urlImage.setAttribute("href", levelName[data.level][0]+"/"+ data.url);
    const img = document.createElement("img");
    img.setAttribute("src", "images/" + data.image);
    img.setAttribute("alt", data.name);
    const content = document.createElement("div");
    content.setAttribute("class", "card-content");
    const title = document.createElement("div");
    title.setAttribute("class", "title");
    const h1 = document.createElement("h1");
    const h1Link = document.createElement("a");
    h1Link.setAttribute("class", "link");
    h1Link.setAttribute("href", data.url);
    h1Link.insertAdjacentText("beforeend", data.name);
    const svgLink = document.createElement("a");
    svgLink.setAttribute(
        "href",
        github + levelName[data.level][0] + "/" + data.url
    );
    svgLink.setAttribute("target", "_blank");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 496 512");
    svg.setAttribute("class", "github");
    svg.classList.add(levelName[data.level][1]);
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
        "d",
        "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
    );
    const classWrapper = document.createElement("div");
    classWrapper.setAttribute("class", "class-wrapper");
    const list = document.createElement("div");
    list.setAttribute("class", "list");
    const ul = document.createElement("ul");
    const classesData = data.classes;
    for (let index = 0; index < classesData.length; index++) {
        const classes = classesData[index];
        const liClass = document.createElement("li");
        liClass.setAttribute("class", classes);
        liClass.insertAdjacentText("beforeend", classes);
        ul.appendChild(liClass);
    }
    const level = document.createElement("div");
    const levelBtn = document.createElement("span");
    levelBtn.setAttribute("class", "level-btn");
    const number = document.createElement("span");
    number.setAttribute("class", "level-number");
    const levelType = document.createElement("span");
    levelType.setAttribute("class", "level");

    const lvl = data.level;
    const color = levelName[lvl][1];
    levelBtn.classList.add(color);
    number.classList.add(color);
    number.insertAdjacentText("beforeend", lvl);
    levelType.classList.add(color);
    levelType.insertAdjacentText("beforeend", levelName[lvl][0]);
    levelBtn.appendChild(number);
    levelBtn.appendChild(levelType);

    main.appendChild(card);
    card.appendChild(cardImage);
    cardImage.appendChild(urlImage);
    urlImage.appendChild(img);
    card.appendChild(content);
    content.appendChild(title);
    title.appendChild(h1);
    h1.appendChild(h1Link);
    title.appendChild(svgLink);
    svgLink.appendChild(svg);
    svg.appendChild(path);
    content.appendChild(classWrapper);
    classWrapper.appendChild(list);
    list.appendChild(ul);
    classWrapper.appendChild(level);
    level.appendChild(levelBtn);
};

getData();
