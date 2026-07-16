export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export type GameStatus = 'idle' | 'playing' | 'paused' | 'game-over';

export type Point = {
  x: number;
  y: number;
};

export type SnakeState = {
  body: Point[];
  color: string;
  direction: Direction;
  pendingDirection: Direction;
};

export type StepResult = {
  ateFood: boolean;
  collision: boolean;
  snake: SnakeState;
};
