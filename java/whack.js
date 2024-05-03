let currentGoombaTile;
let currentBuffGoombaTile;
let currentMarioTile;
let score = 0;
let gameOver = false;    
let counter = 60;
let goombaId
let goombaBuffId
let marioId
const startBtn = document.getElementById("startButton");
const timeDisplay = document.getElementById("time");
const gameBoard = document.getElementById("gameboard");
const gameOverh2 = document.getElementById("gameOverh2");
const scoreText = document.getElementById("score")

startBtn.addEventListener("click", function(){
    gameOver = false
    prepGame();
    startTimer();
    score = 0
    scoreText.innerHTML = score
    startBtn.setAttribute("disabled", true);
});

function startTimer() {
    intervalId = window.setInterval(tikTok, 1000);
}

function tikTok() {
    if (counter > 0){
        counter --;
        timeDisplay.innerHTML = counter;
    }
    else {
        // console.log(gameboard)
            clearInterval(intervalId)
            gameOverFn()


        gameBoard.innerHTML = `<h2>Score:${score}</h2>`
        gameBoard.classList.add("gameover")
    }
}


// adam said i need this on a reset
//clearInterval(intervalId)
//^put in reset functions


function prepGame(){
    gameBoard.innerHTML = ``
    for(let i =0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        // added
        tile.addEventListener("click", selectTile) 
        gameBoard.appendChild(tile);

    }
//pop-up time

    goombaId=setInterval(setGoomba, 1000);
    goombaBuffId=setInterval(setBuffGoomba, 1500);
    marioId=setInterval(setMario, 1200);
}
//randomise tile for goombas and mario
function tileNumber(){
    let number = Math.floor(Math.random() * 9);
    return number.toString();
}

function setGoomba() {
    if (gameOver) {
        return;
    }

    if (currentGoombaTile) {
        currentGoombaTile.innerHTML = "";
    }
    let goomba = document.createElement("img");
    goomba.src = "./media/goomba.png"


    let number = tileNumber ();

    if (currentBuffGoombaTile && currentBuffGoombaTile.id == number) {
        return;
    }
    if (currentMarioTile && currentMarioTile.id == number) {
        return;
    }
    currentGoombaTile = document.getElementById(number);
    currentGoombaTile.appendChild(goomba);
}

function setBuffGoomba() {
    if (gameOver) {
        return;
    }

    if (currentBuffGoombaTile) {
        currentBuffGoombaTile.innerHTML = "";
    }
    let goombaBuff = document.createElement("img");
    goombaBuff.src = "./media/goomba-buff-usethis.png"


    let number = tileNumber ();

    if (currentGoombaTile && currentGoombaTile.id == number) {
        return;
    }

    if (currentMarioTile && currentMarioTile.id == number) {
        return;
    }
    currentBuffGoombaTile = document.getElementById(number);
    currentBuffGoombaTile.appendChild(goombaBuff);
}

function setMario() {
    if (gameOver) {
        return;
    }

    if (currentMarioTile) {
        currentMarioTile.innerHTML = "";
    }
    let mario = document.createElement("img");
    mario.src = "./media/mario.png"


    let number = tileNumber ();

    if (currentBuffGoombaTile && currentBuffGoombaTile.id == number) {
        return;
    }

    if (currentGoombaTile && currentGoombaTile.id == number) {
        return;
    }
    currentMarioTile = document.getElementById(number);
    currentMarioTile.appendChild(mario);
}

function selectTile () {
    if (gameOver) {
        return;
    }

    if (this == currentGoombaTile) {
        score += 10;
        currentGoombaTile.innerHTML = "";
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currentBuffGoombaTile) {
        score += 15;
        currentBuffGoombaTile.innerHTML = "";
        document.getElementById("score").innerText = score.toString();
    }
    else if (this == currentMarioTile) {
        document.getElementById("score").innerHTML = "MAMA MIA: " + score.toString();
        gameOver = true;
        gameOverFn()
        clearInterval(intervalId);
    }

}

function gameOverFn () {
        clearInterval(goombaId)
        clearInterval(goombaBuffId)
        clearInterval(marioId)
        counter = 60;
        startBtn.removeAttribute("disabled");
}

function reset () {
    score = 0
    gameBoard.innerHTML = `<h2>Score:${score}</h2>`
    document.getElementById("score").innerHTML = "0".toString();
}
