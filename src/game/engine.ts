import {
  BOARD_COLS,
  BOARD_ROWS,
  HEADER_ROWS,
  INITIAL_DIRECTION,
  INITIAL_SNAKE_POSITION,
} from './config';
import type { Direction, Point, SnakeState, StepResult } from './types';

const directionDelta: Record<Direction, Point> = {
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  UP: { x: 0, y: -1 },
};

export const createSnake = (color: string): SnakeState => ({
  body: [{ ...INITIAL_SNAKE_POSITION }],
  color,
  direction: INITIAL_DIRECTION,
  pendingDirection: INITIAL_DIRECTION,
});

export const isOppositeDirection = (current: Direction, next: Direction) =>
  (current === 'UP' && next === 'DOWN')
  || (current === 'DOWN' && next === 'UP')
  || (current === 'LEFT' && next === 'RIGHT')
  || (current === 'RIGHT' && next === 'LEFT');

export const queueDirection = (snake: SnakeState, direction: Direction): SnakeState => {
  if (isOppositeDirection(snake.direction, direction)) return snake;

  return {
    ...snake,
    pendingDirection: direction,
  };
};

export const getLevel = (score: number) => Math.floor(score / 5) + 1;

export const getStepDuration = (level: number) => Math.max(80, 200 - (level - 1) * 15);

export const getNextHead = (head: Point, direction: Direction): Point => {
  const delta = directionDelta[direction];

  return {
    x: head.x + delta.x,
    y: head.y + delta.y,
  };
};

export const hasPoint = (points: Point[], point: Point) =>
  points.some((item) => item.x === point.x && item.y === point.y);

export const hasCollision = (
  body: Point[],
  cols = BOARD_COLS,
  rows = BOARD_ROWS,
  headerRows = HEADER_ROWS,
) => {
  const [head, ...tail] = body;

  if (!head) return true;

  return head.x < 0
    || head.x >= cols
    || head.y < headerRows
    || head.y >= rows
    || hasPoint(tail, head);
};

export const createFood = (
  snakeBody: Point[],
  rng: () => number = Math.random,
  cols = BOARD_COLS,
  rows = BOARD_ROWS,
  headerRows = HEADER_ROWS,
): Point => {
  const available: Point[] = [];

  for (let y = headerRows; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const point = { x, y };
      if (!hasPoint(snakeBody, point)) available.push(point);
    }
  }

  const index = Math.floor(rng() * available.length);

  return available[index] ?? { x: 0, y: headerRows };
};

export const stepSnake = (snake: SnakeState, food: Point): StepResult => {
  const direction = snake.pendingDirection;
  const nextHead = getNextHead(snake.body[0], direction);
  const ateFood = nextHead.x === food.x && nextHead.y === food.y;
  const body = ateFood
    ? [nextHead, ...snake.body]
    : [nextHead, ...snake.body.slice(0, -1)];
  const nextSnake = {
    ...snake,
    body,
    direction,
  };

  return {
    ateFood,
    collision: hasCollision(body),
    snake: nextSnake,
  };
};
