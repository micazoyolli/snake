import { AudioManager } from './audio';

export class Controls {
  constructor(snake: any, audio: AudioManager) {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 37 && snake.direction !== 'RIGHT') { snake.setDirection('LEFT'); audio.play('left'); }
      else if (e.keyCode === 38 && snake.direction !== 'DOWN') { snake.setDirection('UP'); audio.play('up'); }
      else if (e.keyCode === 39 && snake.direction !== 'LEFT') { snake.setDirection('RIGHT'); audio.play('right'); }
      else if (e.keyCode === 40 && snake.direction !== 'UP') { snake.setDirection('DOWN'); audio.play('down'); }
    });

    // Basic mobile touch controls
    let startX = 0;
    let startY = 0;
    document.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && snake.direction !== 'LEFT') snake.setDirection('RIGHT');
        else if (diffX < 0 && snake.direction !== 'RIGHT') snake.setDirection('LEFT');
      } else {
        if (diffY > 0 && snake.direction !== 'UP') snake.setDirection('DOWN');
        else if (diffY < 0 && snake.direction !== 'DOWN') snake.setDirection('UP');
      }
    });
  }
}