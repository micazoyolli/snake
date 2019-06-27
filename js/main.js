const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');

// Create the unit
const box = 32;

// Load Images
const ground = new Image();

ground.src = './assets/ground.svg';

const foodImg = new Image();

foodImg.src = './assets/food.svg';

const restartBtn = new Image();

// Load Audio Files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = './assets/audio/dead.mp3';
eat.src = './assets/audio/eat.mp3';
up.src = './assets/audio/up.mp3';
right.src = './assets/audio/right.mp3';
left.src = './assets/audio/left.mp3';
down.src = './assets/audio/down.mp3';

// Create Snake
let snake = [];

snake[0] = {
  x: 9 * box,
  y: 10 * box
};

// Create Food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
}

// Create Score
let score = 0;

// Control the Snake
let destination;

document.addEventListener('keydown', direction);

function direction(event) {
  let key = event.keyCode;

  if (key == 37 && destination != 'RIGHT') {
    left.play();
    destination = 'LEFT';
  } else if (key == 38 && destination != 'DOWN') {
    up.play();
    destination = 'UP';
  } else if (key == 39 && destination != 'LEFT') {
    right.play();
    destination = 'RIGHT';
  } else if (key == 40 && destination != 'UP') {
    down.play();
    destination = 'DOWN';
  }
}

// Check Collision Function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }

  return false;
}

function restart() {
  location.reload();
}

// Draw to the canvas
function draw() {
  ctx.drawImage(ground, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i == 0) ? '#0e8bb1' : '#1fbded';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    ctx.strokeStyle = '#eef1f3';
    ctx.lineWidth = 2;
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  // Old Head Position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Direction
  if (destination == 'LEFT') snakeX -= box;
  if (destination == 'UP') snakeY -= box;
  if (destination == 'RIGHT') snakeX += box;
  if (destination == 'DOWN') snakeY += box;

  // If the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();

    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    }
  } else {
    // Remove the tail
    snake.pop();
  }

  // Add new head
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // Game Over
  if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 *
    box || collision(newHead, snake)) {
    clearInterval(game);


    restartBtn.onload = function() {
      ctx.drawImage(restartBtn, 17 * box, 0.65 * box);
    };

    restartBtn.src = './assets/restart.svg';
    document.getElementById('snake').addEventListener('click', restart);

    dead.play();
  }

  snake.unshift(newHead);

  ctx.fillStyle = '#9ed0df';
  ctx.font = '35px Arial';
  ctx.fillText(score, 2.3 * box, 1.6 * box);
}

// Call function every 200 ms
let game = setInterval(draw, 200);
