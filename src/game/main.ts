import { KEYBOARD_KEYS } from '@micazoyolli/foundation';
import fruitSpriteUrl from '../assets/fruit_types.png';
import '../styles/main.scss';
import { AudioManager } from './audio';
import { CELL_SIZE, LOGICAL_SIZE, SNAKE_COLORS } from './config';
import { createFood, createSnake, getLevel, getStepDuration, queueDirection, stepSnake } from './engine';
import type { Direction, GameStatus, Point, SnakeState } from './types';
import { drawBackground, drawFood, drawHeader, drawSnake } from './utils';

const directionKeys: Record<string, Direction> = {
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  ArrowUp: 'UP',
};

const directionSounds: Record<Direction, string> = {
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
};

const getElement = <T extends HTMLElement>(id: string) => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing element: ${id}`);

  return element as T;
};

class SnakeGame {
  private animationFrame = 0;
  private audio = new AudioManager();
  private controller = new AbortController();
  private food: Point = { x: 4, y: 4 };
  private fruitIndex = 0;
  private fruitSprite = new Image();
  private lastFrameTime = 0;
  private level = 1;
  private pendingTime = 0;
  private score = 0;
  private selectedColor: string = SNAKE_COLORS[1];
  private snake: SnakeState = createSnake(this.selectedColor);
  private status: GameStatus = 'idle';

  private readonly audioButton = getElement<HTMLButtonElement>('audio-btn');
  private readonly canvas = getElement<HTMLCanvasElement>('snake');
  private readonly colorChoices = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-color]'));
  private readonly context = this.canvas.getContext('2d');
  private readonly fruitChoices = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-index]'));
  private readonly gameRoot = getElement<HTMLElement>('game-root');
  private readonly liveRegion = getElement<HTMLElement>('live-region');
  private readonly overlay = getElement<HTMLElement>('overlay');
  private readonly overlayDescription = getElement<HTMLElement>('overlay-description');
  private readonly overlayTitle = getElement<HTMLElement>('overlay-title');
  private readonly pauseButton = getElement<HTMLButtonElement>('pause-btn');
  private readonly startButton = getElement<HTMLButtonElement>('start-btn');
  private readonly touchButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-direction]'));

  init() {
    if (!this.context) {
      this.canvas.classList.add('is-hidden');
      return;
    }

    this.fruitSprite.src = fruitSpriteUrl;
    this.bindEvents();
    this.setCanvasSize();
    this.updateSelection();
    this.updateUi();
    this.render();
  }

  destroy() {
    this.stopLoop();
    this.controller.abort();
  }

  private bindEvents() {
    const signal = this.controller.signal;

    window.addEventListener('resize', () => {
      this.setCanvasSize();
      this.render();
    }, { signal });

    document.addEventListener('keydown', (event) => this.handleKeydown(event), { signal });
    this.audioButton.addEventListener('click', () => this.toggleAudio(), { signal });
    this.pauseButton.addEventListener('click', () => this.togglePause(), { signal });
    this.startButton.addEventListener('click', () => this.start(), { signal });

    this.colorChoices.forEach((button) => {
      button.addEventListener('click', () => {
        this.selectedColor = button.dataset.color ?? this.selectedColor;
        this.updateSelection();
      }, { signal });
    });

    this.fruitChoices.forEach((button) => {
      button.addEventListener('click', () => {
        this.fruitIndex = Number(button.dataset.index ?? this.fruitIndex);
        this.updateSelection();
      }, { signal });
    });

    this.touchButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.dataset.direction as Direction | undefined;
        if (direction) this.changeDirection(direction);
      }, { signal });
    });
  }

  private start() {
    this.stopLoop();
    this.status = 'playing';
    this.score = 0;
    this.level = 1;
    this.pendingTime = 0;
    this.lastFrameTime = performance.now();
    this.snake = createSnake(this.selectedColor);
    this.food = createFood(this.snake.body);
    this.canvas.focus();
    this.announce('Juego iniciado');
    this.updateUi();
    this.render();
    this.animationFrame = requestAnimationFrame((time) => this.loop(time));
  }

  private loop(time: number) {
    if (this.status !== 'playing') return;

    const elapsed = time - this.lastFrameTime;
    this.lastFrameTime = time;
    this.pendingTime += elapsed;

    while (this.pendingTime >= getStepDuration(this.level) && this.status === 'playing') {
      this.step();
      this.pendingTime -= getStepDuration(this.level);
    }

    this.render();
    this.animationFrame = requestAnimationFrame((nextTime) => this.loop(nextTime));
  }

  private step() {
    const result = stepSnake(this.snake, this.food);
    this.snake = result.snake;

    if (result.collision) {
      this.audio.play('dead');
      this.status = 'game-over';
      this.stopLoop();
      this.announce(`Game over. Puntaje ${this.score}. Nivel ${this.level}.`);
      this.updateUi();
      this.render();
      return;
    }

    if (result.ateFood) {
      this.score += 1;
      this.level = getLevel(this.score);
      this.food = createFood(this.snake.body);
      this.audio.play('eat');
    }
  }

  private togglePause() {
    if (this.status === 'playing') {
      this.status = 'paused';
      this.stopLoop();
      this.announce('Juego pausado');
    } else if (this.status === 'paused') {
      this.status = 'playing';
      this.lastFrameTime = performance.now();
      this.announce('Juego reanudado');
      this.animationFrame = requestAnimationFrame((time) => this.loop(time));
    }

    this.updateUi();
  }

  private toggleAudio() {
    this.audio.toggle();
    this.audioButton.textContent = this.audio.enabled ? '🔊' : '🔇';
    this.audioButton.setAttribute('aria-label', this.audio.enabled ? 'Silenciar audio' : 'Activar audio');
  }

  private handleKeydown(event: KeyboardEvent) {
    const activeElement = document.activeElement;
    if (!activeElement || !this.gameRoot.contains(activeElement)) return;

    const direction = directionKeys[event.key];
    if (direction && this.status === 'playing') {
      event.preventDefault();
      this.changeDirection(direction);
      return;
    }

    if (event.key === KEYBOARD_KEYS.space) {
      event.preventDefault();
      this.togglePause();
    }
  }

  private changeDirection(direction: Direction) {
    if (this.status !== 'playing') return;

    const nextSnake = queueDirection(this.snake, direction);
    if (nextSnake.pendingDirection !== this.snake.pendingDirection) {
      this.audio.play(directionSounds[direction]);
    }
    this.snake = nextSnake;
  }

  private setCanvasSize() {
    const size = Math.min(window.innerWidth * 0.88, window.innerHeight * 0.72, LOGICAL_SIZE);
    const dpr = window.devicePixelRatio || 1;

    this.canvas.style.height = `${size}px`;
    this.canvas.style.width = `${size}px`;
    this.canvas.width = Math.round(size * dpr);
    this.canvas.height = Math.round(size * dpr);
    this.context?.setTransform(size * dpr / LOGICAL_SIZE, 0, 0, size * dpr / LOGICAL_SIZE, 0, 0);
  }

  private render() {
    if (!this.context) return;

    this.context.clearRect(0, 0, LOGICAL_SIZE, LOGICAL_SIZE);
    drawBackground(this.context, LOGICAL_SIZE, LOGICAL_SIZE, CELL_SIZE);
    drawHeader(this.context, this.fruitSprite, this.fruitIndex, this.score, this.level, CELL_SIZE, LOGICAL_SIZE);
    drawFood(this.context, this.fruitSprite, this.fruitIndex, this.food, CELL_SIZE);
    drawSnake(this.context, this.snake, CELL_SIZE);
  }

  private updateUi() {
    const overlayVisible = this.status === 'idle' || this.status === 'game-over';
    this.overlay.classList.toggle('visible', overlayVisible);
    this.overlayTitle.textContent = this.status === 'game-over' ? 'GAME OVER' : 'Snake';
    this.overlayDescription.textContent = this.status === 'game-over'
      ? `Puntaje ${this.score}. Nivel ${this.level}. Ajusta tu fruta o color y vuelve a jugar.`
      : 'Elige fruta y color para iniciar.';
    this.startButton.textContent = this.status === 'game-over' ? 'Play Again' : 'Play';
    this.pauseButton.disabled = this.status === 'idle' || this.status === 'game-over';
    this.pauseButton.textContent = this.status === 'paused' ? '▶' : '⏸';
    this.pauseButton.setAttribute('aria-label', this.status === 'paused' ? 'Reanudar juego' : 'Pausar juego');
    this.touchButtons.forEach((button) => {
      button.disabled = this.status !== 'playing';
    });
  }

  private updateSelection() {
    this.colorChoices.forEach((button) => {
      const selected = button.dataset.color === this.selectedColor;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    this.fruitChoices.forEach((button) => {
      const selected = Number(button.dataset.index) === this.fruitIndex;
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }

  private stopLoop() {
    if (!this.animationFrame) return;

    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = 0;
  }

  private announce(message: string) {
    this.liveRegion.textContent = message;
  }
}

const game = new SnakeGame();
game.init();

window.addEventListener('pagehide', () => game.destroy(), { once: true });
