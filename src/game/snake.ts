export class Snake {
  body: { x: number; y: number }[];
  box: number;
  direction: string;
  baseColor: string;

  constructor(box: number, color: string) {
    this.box = box;
    this.direction = '';
    this.baseColor = color;
    this.body = [{ x: 9 * box, y: 10 * box }];
  }

  setDirection(dir: string) {
    this.direction = dir;
  }

  move() {
    this.body.pop();
  }

  updatePosition() {
    let head = { ...this.body[0] };
    if (this.direction === 'LEFT') head.x -= this.box;
    if (this.direction === 'UP') head.y -= this.box;
    if (this.direction === 'RIGHT') head.x += this.box;
    if (this.direction === 'DOWN') head.y += this.box;
    this.body.unshift(head);
  }

  eat(food: { x: number; y: number }) {
    this.updatePosition();
    if (this.body[0].x === food.x && this.body[0].y === food.y) {
      return true;
    }
    return false;
  }

  checkCollision(width: number, height: number) {
    let head = this.body[0];
    if (head.y < this.box * 2 || head.y >= height || head.x < 0 || head.x >= width) {
      return true;
    }
    for (let i = 1; i < this.body.length; i++) {
      if (head.x === this.body[i].x && head.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.body.forEach((segment, index) => {
      const gradient = this.getGradientColor(index);
      ctx.fillStyle = gradient;
      ctx.fillRect(segment.x, segment.y, this.box, this.box);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(segment.x, segment.y, this.box, this.box);

      if (index === 0) {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(segment.x + this.box / 4, segment.y + this.box / 4, 3, 0, Math.PI * 2);
        ctx.arc(segment.x + (3 * this.box) / 4, segment.y + this.box / 4, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  getGradientColor(index: number): string {
    let percent = index / this.body.length;
    let baseRGB = this.hexToRgb(this.baseColor);
    if (!baseRGB) return this.baseColor;

    let r = Math.min(255, Math.floor(baseRGB.r + (255 - baseRGB.r) * percent));
    let g = Math.min(255, Math.floor(baseRGB.g + (255 - baseRGB.g) * percent));
    let b = Math.min(255, Math.floor(baseRGB.b + (255 - baseRGB.b) * percent));

    return `rgb(${r},${g},${b})`;
  }

  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length !== 6) return null;
    const bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }
}