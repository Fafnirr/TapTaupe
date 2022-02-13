let zone = document.querySelector('#zone');
let block;
let rand;
let score = 0;
let boardSize;
let turnTimer;
let generalTimer;
let previousRand = 'hkljhgf';
let time = 10;
let temps = document.querySelector('#time');
let startGame = document.querySelector('.startGame');
let preference = document.querySelector('.preferences');
let gameboard = document.querySelector('.gameboard');
let text = document.querySelector('.text');
let result = document.querySelector('.results');
let form = document.querySelector('.form');

class User{
    constructor(name){
        this.name = name;
    }
}

let getUserKey = sessionStorage.getItem('users');
let getScoreKey = sessionStorage.getItem('score');

if (getUserKey == null) {
    sessionStorage.setItem('users', '');
    sessionStorage.setItem('score', '');
}


form.addEventListener('submit', function (e) {
    e.preventDefault();
    let userName = document.getElementById('name').value;
    let user = new User(userName);

    let usersArray = [];
    if (getUserKey == '') {
        usersArray.push(JSON.stringify(user.name));
        sessionStorage.setItem('users', usersArray);
    } else {
        usersArray.push(getUserKey);
        usersArray.push(JSON.stringify(user.name));
        sessionStorage.setItem('users', usersArray);
    }


});


startGame.addEventListener('click', jouer);

function jouer(){
    generalTimer = setInterval(endgame, 1000);
    form.classList.add('off')
    preference.classList.add('off');
    text.classList.add('off');
    gameboard.classList.remove('off');
    boardSize = document.querySelector('#boardSize').value;
    console.log(boardSize);
    for (let i = 1; i <= boardSize; i++) {
        let div = document.createElement('div');
        div.dataset.id = i;
        div.classList.add('block');
        zone.append(div);
    }
    document.querySelectorAll('.block').forEach(block => {
        let size = 100/Math.sqrt(boardSize); 
        block.style.height = size + '%';
        block.style.width = size + '%';
    });
    nextTurn();
}

zone.addEventListener('click', (el) => {
    el = el.target;
    if (el.dataset.id == rand) {
        score++;
    } else {
        score--;
    }
    nextTurn();
})

function nextTurn() {
    document.querySelector('#score').innerHTML = score;
    clearInterval(turnTimer);
    turnTimer = setInterval(endTurnTimer, 1500);
    if (block) {
        block.classList.remove('image');
    }
    rand = Math.floor(Math.random()*boardSize) +  1;
    // Pour éviter d'avoir 2 fois la même case d'affilé
    while (rand == previousRand) {
        rand = Math.floor(Math.random()*boardSize) + 1;
    }
    previousRand = rand;
    block = document.querySelector(`[data-id="${rand}"]`);
    block.classList.add('image');
}

function endTurnTimer() {
    score--;
    nextTurn();
}

let resultatFinal = document.querySelector('#resultatFinal');

function endgame() {
    time--;
    temps.innerHTML = time;
    if (time == 0) {
        clearInterval(generalTimer);
        clearInterval(turnTimer);
        document.querySelector('#points').innerHTML = score;
        gameboard.classList.add('off');
        result.classList.remove('off');
        let addButton = document.createElement('a');
        let lien = document.createTextNode("Rejouer");
        let scoresArray = [];
        if (getScoreKey == '') {
        scoresArray.push(JSON.stringify(score));
        sessionStorage.setItem('score', scoresArray);
        } else {
        scoresArray.push(getScoreKey);
        scoresArray.push(JSON.stringify(score));
        sessionStorage.setItem('score', scoresArray);
        }    


            addButton.href = 'index.html';
            addButton.setAttribute('class', 'btn btn-primary mt-5');
            addButton.appendChild(lien);
            resultatFinal.appendChild(addButton);
    }
}


let list = document.getElementById('list');
/*
let getUsersKeyParse = sessionStorage.getItem('users');
let getScoreKeyParse = JSON.stringify(sessionStorage.getItem('score'));

for (let i = 0; i < getUsersKeyParse.length; i++) {
            let createElementLi = document.createElement('li');
            createElementLi.textContent = getUsersKeyParse + getScoreKeyParse;
            list.appendChild(createElementLi);
        }*/

