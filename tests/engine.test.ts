import { describe, expect, it } from 'vitest';
import { createFood, createSnake, getLevel, getStepDuration, hasCollision, queueDirection, stepSnake } from '../src/game/engine';
import type { Point } from '../src/game/types';

describe('snake engine', () => {
  it('moves in the current direction', () => {
    const snake = createSnake('#3CC746');
    const result = stepSnake(snake, { x: 0, y: 2 });

    expect(result.snake.body[0]).toEqual({ x: 10, y: 10 });
    expect(result.ateFood).toBe(false);
    expect(result.collision).toBe(false);
  });

  it('grows after eating food', () => {
    const snake = createSnake('#3CC746');
    const result = stepSnake(snake, { x: 10, y: 10 });

    expect(result.ateFood).toBe(true);
    expect(result.snake.body).toHaveLength(2);
  });

  it('prevents reversing direction into itself', () => {
    const snake = createSnake('#3CC746');
    const result = queueDirection(snake, 'LEFT');

    expect(result.pendingDirection).toBe('RIGHT');
  });

  it('allows a valid direction change', () => {
    const snake = createSnake('#3CC746');
    const result = queueDirection(snake, 'UP');

    expect(result.pendingDirection).toBe('UP');
  });

  it('detects wall collision', () => {
    const body: Point[] = [{ x: 0, y: 1 }];

    expect(hasCollision(body)).toBe(true);
  });

  it('detects self collision', () => {
    const body: Point[] = [
      { x: 4, y: 4 },
      { x: 5, y: 4 },
      { x: 4, y: 4 },
    ];

    expect(hasCollision(body)).toBe(true);
  });

  it('places food outside the snake body', () => {
    const food = createFood([{ x: 0, y: 2 }], () => 0);

    expect(food).not.toEqual({ x: 0, y: 2 });
  });

  it('calculates score levels and speed progression', () => {
    expect(getLevel(0)).toBe(1);
    expect(getLevel(5)).toBe(2);
    expect(getStepDuration(2)).toBeLessThan(getStepDuration(1));
  });
});
