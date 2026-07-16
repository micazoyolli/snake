import { CELL_SIZE, FRUIT_SOURCE_SIZE, HEADER_ROWS } from './config';
import type { Point, SnakeState } from './types';

export function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number, box = CELL_SIZE) {
  const colors = ['#AAD750', '#A2D148'];
  for (let y = 0; y < height; y += box) {
    for (let x = 0; x < width; x += box) {
      const index = ((x / box) + (y / box)) % 2;
      ctx.fillStyle = colors[index];
      ctx.fillRect(x, y, box, box);
    }
  }
}

export function drawHeader(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLImageElement,
  fruitIndex: number,
  score: number,
  level: number,
  box: number,
  width: number
) {
  ctx.fillStyle = '#436b2d';
  ctx.fillRect(0, 0, width, box * HEADER_ROWS);

  ctx.fillStyle = '#fff';
  ctx.font = '24px Fredoka, sans-serif';
  ctx.textBaseline = 'middle';

  ctx.drawImage(
    sprite,
    fruitIndex * FRUIT_SOURCE_SIZE, 0, FRUIT_SOURCE_SIZE, FRUIT_SOURCE_SIZE,
    box / 2, box / 2.5, box, box
  );
  ctx.fillText(`${score}`, 1.7 * box, box);
  ctx.fillText(`Nivel ${level}`, width - 3.5 * box, box);
}

export function drawFood(
  ctx: CanvasRenderingContext2D,
  sprite: HTMLImageElement,
  fruitIndex: number,
  food: Point,
  box = CELL_SIZE
) {
  if (!sprite.complete) return;

  ctx.drawImage(
    sprite,
    fruitIndex * FRUIT_SOURCE_SIZE,
    0,
    FRUIT_SOURCE_SIZE,
    FRUIT_SOURCE_SIZE,
    food.x * box,
    food.y * box,
    box,
    box,
  );
}

export function drawSnake(ctx: CanvasRenderingContext2D, snake: SnakeState, box = CELL_SIZE) {
  snake.body.forEach((segment, index) => {
    ctx.fillStyle = getGradientColor(snake.color, index, snake.body.length);
    ctx.fillRect(segment.x * box, segment.y * box, box, box);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(segment.x * box, segment.y * box, box, box);

    if (index === 0) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(segment.x * box + box / 4, segment.y * box + box / 4, 3, 0, Math.PI * 2);
      ctx.arc(segment.x * box + (3 * box) / 4, segment.y * box + box / 4, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

export function getGradientColor(color: string, index: number, length: number): string {
  const rgb = hexToRgb(color);

  if (!rgb) return color;

  const percent = index / Math.max(length, 1);
  const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * percent));
  const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * percent));
  const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * percent));

  return `rgb(${r},${g},${b})`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const value = hex.replace('#', '');

  if (!/^[0-9a-f]{6}$/i.test(value)) return null;

  const numeric = Number.parseInt(value, 16);

  return {
    b: numeric & 255,
    g: (numeric >> 8) & 255,
    r: (numeric >> 16) & 255,
  };
}
