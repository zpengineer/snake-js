const canvas = document.querySelector('#snake');
const ctx = canvas.getContext("2d");

// Размер змейки и фрукта
const snakeSize = 10;
const fruitSize = 10;

// Стартовая позиция змейки
let x = canvas.width / 2;
let y = canvas.height / 2;

// Координаты фруктов
let fx = 0;
let fy = 0;


function drawSnake() {
    ctx.beginPath();
    ctx.fillStyle = '#7d2c98';
    ctx.fillRect(x, y, snakeSize, snakeSize);
    ctx.fill();
    ctx.closePath();
}

function drawFruit() {
    ctx.beginPath();
    ctx.fillStyle = '#00ff73';
    ctx.fillRect(fx, fy, fruitSize, fruitSize);
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFruit();

    if (x > canvas.width - snakeSize ) {
        console.log('Стенка!!!');
        x = 0;
    } else if (x < 0) {
        console.log('Стенка!!!');
        x = canvas.width - snakeSize;
    }

    if (y > canvas.height - snakeSize) {
        console.log('Стенка!!!');
        y = 0;
    } else if (y < 0) {
        console.log('Стенка!!!');
        y = canvas.height - snakeSize;
    }

    if (x === fx && y === fy) {
        console.log('Пора кушать!!');
    }
}

randomFruitPosition();

function randomFruitPosition() {
    fx = getRandomCoord(canvas.width / snakeSize, 0) * snakeSize;
    fy = getRandomCoord(canvas.height / snakeSize, 0) * snakeSize;
    console.log(fx, fy);
}


document.addEventListener('keydown', snakeControl);

function snakeControl(e) {
    if (e.keyCode == 39) {
        x += snakeSize;
    } else if (e.keyCode == 37) {
        x -= snakeSize;
    } else if (e.keyCode == 38) {
        y -= snakeSize;
    } else if (e.keyCode == 40) {
        y += snakeSize;
    }
}

function getRandomCoord(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

let gameInterval = setInterval(draw, 10);

