import { BaseComponent } from '../../../shared/components/base-element/base-component';
import {
  ButtonBaseElement,
} from '../../../shared/components/button-base-element/button-base-element';

import { IWord } from '../../../api/api-interfaces';
import {
  GameSprintStartScreen,
} from '../game-sprint-start-screen/game-sprint-start-screen';

export class GameSprintResultScreen extends BaseComponent {
  element: HTMLDivElement;

  title = new BaseComponent('div', ['result-screen__title'], 'Ваша статистика ответов:');

  main = new BaseComponent('div', ['result-screen__main']);

  textbookButton =
    new ButtonBaseElement(['result-screen__textbook'], 'Перейти в учебник');

  oneMoreGameButton =
    new ButtonBaseElement(['result-screen__one-more-game'], 'Сыграть ещё одну игру');

  constructor(result: { correct: IWord[], mistake: IWord[] }) {
    super('div', ['game-sprint__result-screen']);

    this.main.element.append(new BaseComponent(
      'div',
      ['result-screen__correct-answer-title'],
      'Правильные ответы:').element,
    );

    result.correct.forEach(value => {
      this.main.element.append(
        new BaseComponent('div', [], `${value.word} - ${value.wordTranslate}`).element,
      );
    });

    this.main.element.append(new BaseComponent(
      'div',
      ['result-screen__incorrect-answer-title'],
      'Неправильные ответы:').element,
    );

    result.mistake.forEach(value => {
      this.main.element.append(
        new BaseComponent('div', [], `${value.word} - ${value.wordTranslate}`).element,
      );
    });

    this.element.append(
      this.title.element,
      this.main.element,
      this.textbookButton.element,
      this.oneMoreGameButton.element,
    );

    this.oneMoreGameButton.element.addEventListener('click', () => {
      this.element.replaceWith(new GameSprintStartScreen(null).element);
    });
  }
}
