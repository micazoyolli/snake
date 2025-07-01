import '../styles/main.scss';
import { Snake } from './snake';
import { Food } from './food';
import { Controls } from './controls';
import { AudioManager } from './audio';
import { drawBackground, drawHeader } from './utils';

const canvas = document.getElementById('snake') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const box = 32;

let score = 0;
let playing = false;
let snakeColor = '';
let fruitIndex = 0;
let snake: Snake;
let food: Food;
let audio = new AudioManager();
let controls: Controls;
let game: any;

const fruitSprite = new Image();
fruitSprite.src = './assets/fruit_types.png';

fruitSprite.onload = () => {
  setupOverlayListeners();
  document.getElementById('start-btn')!.addEventListener('click', startGame);
};

function setupOverlayListeners() {
  document.querySelectorAll('#color-choices .color-choice').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.color-choice').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      snakeColor = (el as HTMLElement).dataset.color!;
    });
  });

  document.querySelectorAll('#fruit-choices .fruit-choice').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.fruit-choice').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      fruitIndex = parseInt((el as HTMLElement).dataset.index!, 10);
    });
  });
}

function startGame() {
  if (!snakeColor) {
    const colors = ['#ECD718', '#3CC746', '#B84DF2', '#F6F6F6', '#1BD9E6', '#4F76F9'];
    snakeColor = colors[Math.floor(Math.random() * colors.length)];
  }

  if (!document.querySelector('.fruit-choice.selected')) {
    fruitIndex = Math.floor(Math.random() * 14);
  }

  score = 0;
  snake = new Snake(box, snakeColor);
  snake.setDirection('RIGHT');
  food = new Food(box, fruitIndex, fruitSprite);
  controls = new Controls(snake, audio);
  playing = true;

  document.getElementById('overlay')!.classList.remove('visible');
  clearInterval(game);
  game = setInterval(draw, 200);
}

function draw() {
  drawBackground(ctx, canvas.width, canvas.height, box);
  drawHeader(ctx, fruitSprite, fruitIndex, score, box, canvas.width);
  snake.draw(ctx);
  food.draw(ctx);

  if (snake.eat(food)) {
    score++;
    audio.play('eat');
    food.reposition(snake.body);
  } else {
    snake.move();
  }

  if (snake.checkCollision(canvas.width, canvas.height)) {
    audio.play('dead');
    clearInterval(game);
    playing = false;
    showGameOver();
  }
}

function showGameOver() {
  const overlay = document.getElementById('overlay')!;
  overlay.classList.add('visible');
  overlay.innerHTML = `
    <div class="modal">
      <h1>GAME OVER</h1>
      <p>Elige tu fruta:</p>
      <div class="choices" id="fruit-choices">
        ${Array.from({ length: 14 }, (_, i) => `<span class="fruit-choice" data-index="${i}"></span>`).join('')}
      </div>
      <p>Elige color de la snake:</p>
      <div class="choices" id="color-choices">
        <span class="color-choice" data-color="#ECD718" style="background:#ECD718"></span>
        <span class="color-choice" data-color="#3CC746" style="background:#3CC746"></span>
        <span class="color-choice" data-color="#B84DF2" style="background:#B84DF2"></span>
        <span class="color-choice" data-color="#F6F6F6" style="background:#F6F6F6"></span>
        <span class="color-choice" data-color="#1BD9E6" style="background:#1BD9E6"></span>
        <span class="color-choice" data-color="#4F76F9" style="background:#4F76F9"></span>
      </div>
      <button id="start-btn">▶ Play Again</button>
    </div>
  `;
  setupOverlayListeners();
  document.getElementById('start-btn')!.addEventListener('click', startGame);
}

// Botones reales
document.getElementById('audio-btn')!.addEventListener('click', () => {
  audio.toggle();
  document.getElementById('audio-btn')!.textContent = audio.enabled ? '🔊' : '🔇';
});

document.getElementById('pause-btn')!.addEventListener('click', () => {
  if (playing) {
    clearInterval(game);
  } else {
    game = setInterval(draw, 200);
  }
  playing = !playing;
  document.getElementById('pause-btn')!.textContent = playing ? '⏸' : '▶';
});