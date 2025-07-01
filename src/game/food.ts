export class Food {
  x: number = 0;
  y: number = 0;
  box: number;
  sprite: HTMLImageElement;
  spriteIndex: number;

  constructor(box: number, spriteIndex: number, sprite: HTMLImageElement) {
    this.box = box;
    this.spriteIndex = spriteIndex;
    this.sprite = sprite;
    this.reposition([]);
  }

  reposition(snakeBody: { x: number; y: number }[]) {
    let valid = false;
    while (!valid) {
      this.x = Math.floor(Math.random() * 17 + 1) * this.box;
      this.y = Math.floor(Math.random() * 15 + 3) * this.box;
      valid = !snakeBody.some(seg => seg.x === this.x && seg.y === this.y);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const fruitX = this.spriteIndex * 138;
    if (this.sprite.complete) {
      ctx.drawImage(this.sprite, fruitX, 0, 138, 138, this.x, this.y, this.box, this.box);
    }
  }
}