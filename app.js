const github = 'https://github.com/KevinLeleux/frontend-mentor/tree/master/';
const main = document.getElementById('main');
const checkbox = document.getElementsByName('level');
const arrows = document.querySelectorAll('.arrow');

/* Set default levels array */
const levels = [];
for (let index = 0; index < checkbox.length; index++) {
  levels.push(checkbox[index].id);
}

/* Filters mobile */
const filterBtn = document.querySelector('.filter-btn');
filterBtn.addEventListener('click', function () {
  document.querySelector('.filters').classList.add('visible');
  document.body.style.overflowY = 'hidden';
});

const crossBtn = document.querySelector('.cross-icon');
crossBtn.addEventListener('click', function () {
  document.querySelector('.filters').classList.remove('visible');
  document.body.style.overflowY = '';
});

/* Check if click is outside the filter menu dropdown */
document.addEventListener('click', (event) => {
  const filters = document.querySelector('.filters');
  let targetElement = event.target;
  do {
    if (targetElement == filters || targetElement == filterBtn) {
      return;
    }
    targetElement = targetElement.parentNode;
  } while (targetElement);
  document.querySelector('.filters').classList.remove('visible');
  document.body.style.overflowY = '';
});

/* Check if order change */
let order = 'asc';

for (let index = 0; index < arrows.length; index++) {
  arrows[index].addEventListener('click', function () {
    for (let index = 0; index < arrows.length; index++) {
      arrows[index].classList.remove('active');
    }
    arrows[index].classList.add('active');
    if (arrows[index].innerText === 'arrow_upward') {
      order = 'dsc';
    } else {
      order = 'asc';
    }
    updateData(levels);
  });
}

/* Check if level filter is activated */
for (let i = 0; i < checkbox.length; i++) {
  checkbox[i].addEventListener('change', function () {
    const index = levels.indexOf(checkbox[i].id);
    if (checkbox[i].checked) {
      levels.push(checkbox[i].id);
    }
    if (!checkbox[i].checked) {
      levels.splice(index, 1);
    }
    updateData(levels);
  });
}

const getData = async () => {
  const data = await (await fetch('db.json')).json();
  const challenges = data.challenges;

  for (let index = challenges.length - 1; index >= 0; index--) {
    const data = challenges[index];
    createCard(data);
  }
};

const updateData = async (levels) => {
  const card = document.querySelectorAll('.card');
  for (let index = 0; index < card.length; index++) {
    main.removeChild(card[index]);
  }
  const data = await (await fetch('db.json')).json();
  const challenges = data.challenges;
  if (order === 'asc') {
    for (let index = 0; index < challenges.length; index++) {
      const data = challenges[index];
      if (levels.includes(data.level)) {
        createCard(data);
      }
    }
  } else {
    for (let index = challenges.length - 1; index >= 0; index--) {
      const data = challenges[index];
      if (levels.includes(data.level)) {
        createCard(data);
      }
    }
  }
};

/* Set the color for CSS class */
const levelName = {
  1: ['newbie', 'blue'],
  2: ['junior', 'green'],
  3: ['intermediate', 'orange'],
  4: ['advanced', 'dark-orange'],
  5: ['guru', 'red'],
};

const createCard = (data) => {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  main.appendChild(card);

  const cardImage = document.createElement('div');
  cardImage.setAttribute('class', 'card-image');
  card.appendChild(cardImage);

  const urlImage = document.createElement('a');
  urlImage.setAttribute('href', levelName[data.level][0] + '/' + data.url);
  cardImage.appendChild(urlImage);

  const img = document.createElement('img');
  img.setAttribute('src', 'images/' + data.image);
  img.setAttribute('alt', data.name);
  urlImage.appendChild(img);

  const content = document.createElement('div');
  content.setAttribute('class', 'card-content');
  card.appendChild(content);

  const title = document.createElement('div');
  title.setAttribute('class', 'title');
  content.appendChild(title);

  const h1 = document.createElement('h1');
  title.appendChild(h1);

  const h1Link = document.createElement('a');
  h1Link.setAttribute('class', 'link');
  h1Link.setAttribute('href', levelName[data.level][0] + '/' + data.url);
  h1Link.insertAdjacentText('beforeend', data.name);
  h1.appendChild(h1Link);

  const svgLink = document.createElement('a');
  svgLink.setAttribute('href', github + levelName[data.level][0] + '/' + data.url);
  svgLink.setAttribute('target', '_blank');
  title.appendChild(svgLink);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 496 512');
  svg.setAttribute('class', 'github');
  svg.classList.add(levelName[data.level][1]);
  svgLink.appendChild(svg);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute(
    'd',
    'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
  );
  svg.appendChild(path);

  const classWrapper = document.createElement('div');
  classWrapper.setAttribute('class', 'class-wrapper');
  content.appendChild(classWrapper);

  const list = document.createElement('div');
  list.setAttribute('class', 'list');
  classWrapper.appendChild(list);

  const ul = document.createElement('ul');
  list.appendChild(ul);

  const languagesData = data.languages;
  for (let index = 0; index < languagesData.length; index++) {
    const classes = languagesData[index];
    const liClass = document.createElement('li');
    liClass.setAttribute('class', classes);
    liClass.insertAdjacentText('beforeend', classes);
    ul.appendChild(liClass);
  }
  const level = document.createElement('div');
  classWrapper.appendChild(level);

  const levelBtn = document.createElement('span');
  levelBtn.setAttribute('class', 'level-btn');
  level.appendChild(levelBtn);

  const number = document.createElement('span');
  number.setAttribute('class', 'level-number');
  levelBtn.appendChild(number);

  const levelType = document.createElement('span');
  levelType.setAttribute('class', 'level');
  levelBtn.appendChild(levelType);

  const lvl = data.level;
  const color = levelName[lvl][1];
  levelBtn.classList.add(color);
  number.classList.add(color);
  number.insertAdjacentText('beforeend', lvl);
  levelType.classList.add(color);
  levelType.insertAdjacentText('beforeend', levelName[lvl][0]);
};

getData();
