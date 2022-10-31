const main = document.getElementById("main");

const getData = async () => {
    const data = await (await fetch("db.json")).json();
    const challenges = data.challenges;
    for (let index = 0; index < challenges.length; index++) {
        const data = challenges[index];
        console.log(data);
        createCard(data);
    }
};

const createCard = (data) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    const cardImage = document.createElement("div");
    cardImage.setAttribute("class", "card-image");
    const urlImage = document.createElement("a");
    urlImage.setAttribute("href", data.url);
    const img = document.createElement("img");
    img.setAttribute("src", "images/"+data.image);
    img.setAttribute("alt", data.name);
    const content = document.createElement("div");
    content.setAttribute("class", "card-content");
    const h1 = document.createElement("h1");
    const h1Link = document.createElement("a");
    h1Link.setAttribute("class", "link");
    h1Link.setAttribute("href", data.url);
    h1Link.insertAdjacentText("beforeend", data.name);
    const classWrapper = document.createElement("div");
    classWrapper.setAttribute("class", "class-wrapper");
    const list = document.createElement("div");
    list.setAttribute("class", "list");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
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
    if (data.level == 1) {
        const number = document.createElement("span");
        number.setAttribute("class", "level-number-blue");
        number.insertAdjacentText("beforeend", "1");
        const levelType = document.createElement("span");
        levelType.setAttribute("class", "level-blue");
        levelType.insertAdjacentText("beforeend", "newbie");
        levelBtn.appendChild(number);
        levelBtn.appendChild(levelType);
    }

    main.appendChild(card);
    card.appendChild(cardImage);
    cardImage.appendChild(urlImage);
    urlImage.appendChild(img);
    card.appendChild(content);
    content.appendChild(h1);
    h1.appendChild(h1Link);
    content.appendChild(classWrapper);
    classWrapper.appendChild(list);
    list.appendChild(ul);
    classWrapper.appendChild(level);
    level.appendChild(levelBtn);
};

getData();

const github = "https://github.com/BeholderGit/frontend-mentor/tree/master/";
