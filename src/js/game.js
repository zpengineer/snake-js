const canvas = document.querySelector('#snake');
const ctx = canvas.getContext("2d");

// Размер змейки и фрукта
const snakeSize = 10;
const fruitSize = 10;

// Стартовая позиция змейки
let snakeX = canvas.width / 2;
let snakeY = canvas.height / 2;
let dx = snakeSize;
let dy = 0;

// Координаты фруктов
let fx = getRandomCoord(canvas.width / snakeSize, 0) * snakeSize;
let fy = getRandomCoord(canvas.width / snakeSize, 0) * snakeSize;

let score = 0;
let snake = [];
let tailLength = 1;

// function drawSnake() {

//     for (let i = 0; i < snake.length; i += 1){
//         ctx.beginPath();
//         ctx.fillStyle = '#7d2c98';
//         ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);
//         ctx.fill();
//     }

// }

function drawFruit() {
    ctx.beginPath();
    ctx.fillStyle = '#00ff73';
    ctx.fillRect(fx, fy, fruitSize, fruitSize);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFruit();

    snakeX += dx;
    snakeY += dy;

    if (snakeX === fx && snakeY === fy) {
        score += 1;
        tailLength += 1;
        fx = getRandomCoord(canvas.width / snakeSize, 0) * snakeSize;
        fy = getRandomCoord(canvas.width / snakeSize, 0) * snakeSize;

        console.log(snake);
    }

    if (snakeX > canvas.width - snakeSize ) {
        snakeX = 0;
    } else if (snakeX < 0) {
        snakeX = canvas.width - snakeSize;
    }

    if (snakeY > canvas.height - snakeSize) {
        snakeY = 0;
    } else if (snakeY < 0) {
        snakeY = canvas.height - snakeSize;
    }

    snake.unshift({ x: snakeX, y: snakeY });

    if (snake.length > tailLength) {
        snake.pop();
    }

    snake.forEach(function (cell, index) {
        ctx.beginPath();
        ctx.fillStyle = '#7d2c98';
        ctx.fillRect(cell.x, cell.y, snakeSize, snakeSize);
        ctx.fill();
    });

    for (let i = 0; i < snake.length; i += 1){
        if (snakeX == snake[i].x && snakeY == snake[i].y) {
            //  clearInterval(gameInterval);
            console.log('GAME OVER');
        }
    }
}

document.addEventListener('keydown', snakeControl);

function snakeControl(e) {
    if (e.keyCode == 39) {
        dx = snakeSize;
        dy = 0;
    } else if (e.keyCode == 37) {
        dx = -snakeSize;
        dy = 0;
    } else if (e.keyCode == 38) {
        dy = -snakeSize;
        dx = 0;
    } else if (e.keyCode == 40) {
        dy = snakeSize;
        dx = 0;
    }
}

function getRandomCoord(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

let gameInterval = setInterval(draw, 100);