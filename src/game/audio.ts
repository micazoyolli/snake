export class AudioManager {
  enabled = true;
  sounds: Record<string, HTMLAudioElement>;

  constructor() {
    this.sounds = {
      dead: new Audio('./assets/audio/dead.mp3'),
      eat: new Audio('./assets/audio/eat.mp3'),
      up: new Audio('./assets/audio/up.mp3'),
      right: new Audio('./assets/audio/right.mp3'),
      left: new Audio('./assets/audio/left.mp3'),
      down: new Audio('./assets/audio/down.mp3')
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
