import { BaseComponent } from '../../../shared/components/base-element/base-component';
import {
  ButtonBaseElement,
} from '../../../shared/components/button-base-element/button-base-element';

import { BASE_URL, IWord } from '../../../api/api-interfaces';
import {
  GameSprintStartScreen,
} from '../game-sprint-start-screen/game-sprint-start-screen';
import { AudioPlayer } from '../../../shared/components/audio-player/audio-player';
import './game-sprint-result-screen.scss';

export class GameSprintResultScreen extends BaseComponent {
  element: HTMLDivElement;

  title = new BaseComponent('div', ['result-screen__title'], 'Ваша статистика ответов:');

  main = new BaseComponent('div', ['result-screen__main']);

  textbookButton =
    new ButtonBaseElement(['result-screen__textbook'], 'Перейти в учебник');

  oneMoreGameButton =
    new ButtonBaseElement(['result-screen__one-more-game'], 'Сыграть ещё одну игру');

  correctAnswerContainer = new BaseComponent(
    'div',
    ['result-screen__correct-answer'],
    'Правильные ответы:',
  );

  incorrectAnswerContainer = new BaseComponent(
    'div',
    ['result-screen__incorrect-answer'],
    'Неправильные ответы:',
  );

  constructor(result: { correct: IWord[], mistake: IWord[] }) {
    super('div', ['game-sprint__result-screen']);

    this.correctAnswerContainer.element.textContent =
      `Правильные ответы (${result.correct.length ? result.correct.length : ''}):`;

    this.incorrectAnswerContainer.element.textContent =
      `Неправильные ответы (${result.mistake.length ? result.mistake.length : ''}):`;

    this.main.element.append(
      this.correctAnswerContainer.element,
      this.incorrectAnswerContainer.element,
    );

    this.addWordToContainer(result.correct, this.correctAnswerContainer.element);
    this.addWordToContainer(result.mistake, this.incorrectAnswerContainer.element);

    const buttonContainer = new BaseComponent(
      'div',
      ['game-sprint__result-screen-button-container'],
    );
    buttonContainer.element.append(
      this.textbookButton.element,
      this.oneMoreGameButton.element,
    );
    this.element.append(
      this.title.element,
      this.main.element,
      buttonContainer.element,
    );

    this.oneMoreGameButton.element.addEventListener('click', () => {
      this.element.replaceWith(new GameSprintStartScreen(null).element);
    });

    this.textbookButton.element.addEventListener('click', () => {
      window.location.hash = '#textbook';
    });
  }

  addWordToContainer(arrayWord: IWord[], container: HTMLElement) {
    arrayWord.forEach(value => {
      const player = new AudioPlayer();
      player.addInPlaylist(`${BASE_URL}/${value.audio}`);
      const btn = new ButtonBaseElement(['word-audio']).element;
      player.setControlElement(btn);
      const div = new BaseComponent(
        'div',
        ['word-container'],
        `${value.word} - ${value.wordTranslate}`,
      ).element;
      div.prepend(btn);

      container.append(div);
    });
  }
}
