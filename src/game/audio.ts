import deadSound from '../assets/audio/dead.mp3';
import downSound from '../assets/audio/down.mp3';
import eatSound from '../assets/audio/eat.mp3';
import leftSound from '../assets/audio/left.mp3';
import rightSound from '../assets/audio/right.mp3';
import upSound from '../assets/audio/up.mp3';

export class AudioManager {
  enabled = true;
  sounds: Record<string, HTMLAudioElement>;

  constructor() {
    this.sounds = {
      dead: new Audio(deadSound),
      down: new Audio(downSound),
      eat: new Audio(eatSound),
      left: new Audio(leftSound),
      right: new Audio(rightSound),
      up: new Audio(upSound),
    };
  }

  play(name: string) {
    if (!this.enabled || !this.sounds[name]) return;

    this.sounds[name].currentTime = 0;
    void this.sounds[name].play();
  }

  toggle() {
    this.enabled = !this.enabled;
  }
}
