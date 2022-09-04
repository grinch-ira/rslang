import { BaseComponent } from '../shared/components/base-element/base-component';
// eslint-disable-next-line max-len
import { ImageBaseElement } from '../shared/components/image-base-element/image-base-element';
import './games-page.scss';

export class GamesPage extends BaseComponent {

  private gamesPageTitle: BaseComponent;

  private linkToSprintGame: BaseComponent;

  private linkToAudioCallGame: BaseComponent;

  private sprintImage: ImageBaseElement;

  private audioCallImage: BaseComponent;

  private imagesWrapper: BaseComponent;

  private sprintGameName: BaseComponent;

  private audioCallGameName: BaseComponent;

  constructor() {
    super('div', ['games-page']);
    this.gamesPageTitle = new BaseComponent('div', ['games-page-title'], 'Игры');
    this.linkToSprintGame = new BaseComponent('a', ['link-to-sprint']);
    this.linkToSprintGame.element.setAttribute('href', '#');
    this.linkToAudioCallGame = new BaseComponent('a', ['link-to-audiocall']);
    this.linkToAudioCallGame.element.setAttribute('href', '#');
    this.sprintGameName = new BaseComponent('p', ['sprint-name'], 'Спринт');
    this.audioCallGameName = new BaseComponent('p', ['audiocall-name'], 'Аудиовызов');
    this.sprintImage = new ImageBaseElement('sprint', '../../assets/sprint.jpg' );
    this.audioCallImage = new ImageBaseElement(
      'audiocall', '../../assets/audiocall.jpg' );
    this.imagesWrapper = new BaseComponent('div', ['images-wrapper']);

    this.element.appendChild(this.gamesPageTitle.element);
    this.linkToSprintGame.element.appendChild(this.sprintGameName.element);
    this.linkToSprintGame.element.appendChild(this.sprintImage.element);
    this.linkToAudioCallGame.element.appendChild(this.audioCallGameName.element);
    this.linkToAudioCallGame.element.appendChild(this.audioCallImage.element);
    this.imagesWrapper.element.appendChild(this.linkToSprintGame.element);
    this.imagesWrapper.element.appendChild(this.linkToAudioCallGame.element);
    this.element.appendChild(this.imagesWrapper.element);

  }
}
