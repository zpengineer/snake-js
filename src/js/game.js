const refs = {
    canvas: document.querySelector('#snake'),
    scoreEl: document.querySelector(".score"),
    startBtn: document.querySelector('[data-modal-start]'),
    restartBtn: document.querySelector('[data-modal-restart]'),
    modalStart: document.querySelector('#modalStart'),
    modalRestart: document.querySelector('#modalRestart'),
}

const ctx = refs.canvas.getContext("2d");

const snakeSize = 10;
const fruitSize = 10;

let snakeX = refs.canvas.width / 2;
let snakeY = refs.canvas.height / 2;

let dx = snakeSize;
let dy = 0;

let fruitX = getRandomCoord(refs.canvas.width / snakeSize, 0) * snakeSize;
let fruitY = getRandomCoord(refs.canvas.width / snakeSize, 0) * snakeSize;

let score = 0;
let snake = [];
let tailLength = 3;
let gameInterval = null;
let SPEED_GAME = 5;

document.addEventListener('keydown', snakeControl);
refs.startBtn.addEventListener('click', startGame);
refs.restartBtn.addEventListener('click', restartGame);

function drawSnake() {

    snakeX += dx;
    snakeY += dy;

    snake.unshift({ x: snakeX, y: snakeY });

    if (snake.length > tailLength) {
        snake.pop();
    }

    snake.forEach(function(item, index){
        ctx.beginPath();
        ctx.fillStyle = '#7d2c98';
        ctx.fillRect(item.x, item.y, snakeSize, snakeSize);
        ctx.fill();

        for (var i = index + 1; i < snake.length; i += 1) {
            if(snake[i].x === item.x && snake[i].y === item.y){
                console.log('GAME OVER');

                gameOver();
            }
        }
        
    });

    if (snakeX === fruitX && snakeY === fruitY) {

        score += 1;
        tailLength += 1;

        fruitX = getRandomCoord(refs.canvas.width / snakeSize, 0) * snakeSize;
        fruitY = getRandomCoord(refs.canvas.width / snakeSize, 0) * snakeSize;
    }

}

function drawFruit() {

    ctx.beginPath();
    ctx.fillStyle = '#00ff73';
    ctx.fillRect(fruitX, fruitY, fruitSize, fruitSize);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, refs.canvas.width, refs.canvas.height);
    drawFruit();
    drawSnake();
    drawScore();

    if (snakeX > refs.canvas.width - snakeSize ) {
        snakeX = 0;
    } else if (snakeX < 0) {
        snakeX = refs.canvas.width - snakeSize;
    }

    if (snakeY > refs.canvas.height - snakeSize) {
        snakeY = 0;
    } else if (snakeY < 0) {
        snakeY = refs.canvas.height - snakeSize;
    }

    if (score > 5 ) {
        SPEED_GAME = 7;
    }
    
    if (score > 10) {
        SPEED_GAME = 10;
    }
    
    if (score > 18) {
        SPEED_GAME = 14;
    }

    console.log(SPEED_GAME);

    gameInterval = setTimeout(draw, 1000 / SPEED_GAME)

}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function snakeControl(e) {

    const up = dy === -snakeSize;
    const down = dy === snakeSize;
    const right = dx === snakeSize;
    const left = dx === -snakeSize;

    if (e.keyCode == 39 && !left) {
        dx = snakeSize;
        dy = 0;
    } else if (e.keyCode == 37 && !right) {
        dx = -snakeSize;
        dy = 0;
    } else if (e.keyCode == 38 && !down) {
        dy = -snakeSize;
        dx = 0;
    } else if (e.keyCode == 40 && !up) {
        dy = snakeSize;
        dx = 0;
    }
}

function getRandomCoord(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function gameOver() {

    clearTimeout(gameInterval);

    refs.scoreEl.textContent = `Your score: ${score}`;
    refs.modalRestart.classList.remove('modal-close');
    refs.modalRestart.classList.add('modal-open');

}

function restartGame() {

    refs.modalRestart.classList.remove('modal-open');
    refs.modalRestart.classList.add('modal-close');

    ctx.clearRect(0, 0, refs.canvas.width, refs.canvas.height);

    snakeX = refs.canvas.width / 2;
    snakeY = refs.canvas.height / 2;

    fruitX = getRandomCoord(refs.canvas.width / snakeSize, 0) * snakeSize;
    fruitY = getRandomCoord(refs.canvas.width / snakeSize, 0) * snakeSize;

    snake = [];
    tailLength = 3;
    score = 0;
    SPEED_GAME = 5;

    dx = snakeSize;
    dy = 0;
    draw();
}

function startGame() {

    refs.modalStart.classList.remove('modal-open');
    refs.modalStart.classList.add('modal-close');
    draw();
}