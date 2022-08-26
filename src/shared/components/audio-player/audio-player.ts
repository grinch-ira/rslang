export class AudioPlayer {
  player: HTMLAudioElement;

  controlElement: HTMLElement | undefined;

  isPlaying: boolean;

  playlist: string[];

  currentPlaylist: string[];

  constructor() {
    this.player = new Audio();
    this.isPlaying = false;
    this.controlElement = undefined;
    this.playlist = [];
  }

  public addInPlaylist(...samples: string[]): void {
    if (this.isPlaying) this.stopPlayer();
    this.cleanPlayList();
    this.playlist = [...samples];
  }

  public setControlElement(element: HTMLElement): void {
    this.controlElement = element;
    this.controlElement.addEventListener('click', () => {
      this.controlElementClick();
    });
    this.updateControlElement();
  }

  private cleanPlayList(): void {
    this.playlist.length = 0;
  }

  private getPlayIcon(isPlay: boolean): string {
    // eslint-disable-next-line max-len
    return isPlay ? '<?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="darkgreen"><title/><g data-name="Layer 2" id="Layer_2"><path d="M19.45,4.11a1,1,0,0,0-1,.09L10.67,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1h7.67l7.73,5.8A1,1,0,0,0,20,27V5A1,1,0,0,0,19.45,4.11Z"/><path d="M23,12a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V13A1,1,0,0,0,23,12Z"/><path d="M26,10a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V11A1,1,0,0,0,26,10Z"/><path d="M29,8a1,1,0,0,0-1,1V23a1,1,0,0,0,2,0V9A1,1,0,0,0,29,8Z"/></g></svg>'
    // eslint-disable-next-line max-len
      : '<?xml version="1.0" ?><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#2907f5a1"><title/><g data-name="Layer 2" id="Layer_2"><path d="M19.45,4.11a1,1,0,0,0-1,.09L10.67,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1h7.67l7.73,5.8A1,1,0,0,0,20,27V5A1,1,0,0,0,19.45,4.11Z"/></g></svg>';
  }

  private playNext(): void {
    if (this.currentPlaylist.length) {
      const canPlayThrought = () => {
        this.player.play();
        this.isPlaying = true;
        this.updateControlElement();
        this.player.removeEventListener('canplaythrough', canPlayThrought);
      };
      const ended = () => {
        this.isPlaying = false;
        this.playNext();
        this.updateControlElement();
        this.player.removeEventListener('ended', ended);
      };
      this.player.src = this.currentPlaylist.shift() as string;
      this.player.addEventListener('canplaythrough', canPlayThrought);
      this.player.addEventListener('ended', ended);
    } else {
      this.isPlaying = false;
      this.updateControlElement();
    }
  }

  private stopPlayer(): void {
    this.player.pause();
    this.player.src = '';
    this.player = new Audio();
    this.isPlaying = false;
    this.updateControlElement();
  }

  private updateControlElement(): void {
    if (this.controlElement) {
      this.controlElement.innerHTML = this.getPlayIcon(this.isPlaying);
    }
  }

  private controlElementClick(): void {
    if (this.isPlaying) {
      this.stopPlayer();
    } else {
      this.currentPlaylist = [...this.playlist];
      this.playNext();
    }
  }
}
