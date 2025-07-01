export function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number, box: number) {
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
  box: number,
  width: number
) {
  ctx.fillStyle = '#436b2d';
  ctx.fillRect(0, 0, width, box * 2);

  ctx.drawImage(
    sprite,
    fruitIndex * 138, 0, 138, 128,
    box / 2, box / 2.5, box, box
  );
  ctx.fillText(`${score}`, 1.5 * box, box);

  ctx.fillStyle = '#fff';
  ctx.font = '24px Fredoka';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${score}`, 1.7 * box, box);
}