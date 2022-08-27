import { BaseComponent } from '../../../shared/components/base-element/base-component';
import './game-sprint-start-screen.scss';
import {
  GAME_SPRINT_DESCRIPTION,
  GAME_SPRINT_LEVEL_SELECTED,
  GAME_SPRINT_TITLE,
} from '../../models/text';
import { WordDifficultyGroup } from '../../../api/api-interfaces';
import {
  ButtonBaseElement,
} from '../../../shared/components/button-base-element/button-base-element';

export class GameSprintStartScreen extends BaseComponent {

  element: HTMLDivElement;

  startGameButton: ButtonBaseElement;

  selectedLevel: WordDifficultyGroup;

  constructor(private level: WordDifficultyGroup | null) {
    super('div', ['game-sprint__start-screen']);
    this.startGameButton = new ButtonBaseElement(
      ['game-sprint__block-2-selected-button'],
      'Начать',
    );
    this.element.append(this.createBlock1().element);
    this.element.append(this.createBlock2(level).element);

    if (level) {
      this.selectedLevel = level;
    }
  }

  createBlock1() {
    const block = new BaseComponent('div', ['game-sprint__block-1']);
    const title = new BaseComponent('p', ['game-sprint__title'], GAME_SPRINT_TITLE);
    const description = new BaseComponent(
      'p',
      ['game-sprint__description'],
      GAME_SPRINT_DESCRIPTION,
    );
    block.element.append(title.element, description.element);
    return block;
  }

  createBlock2(level: WordDifficultyGroup | null) {
    const block = new BaseComponent('div', ['game-sprint__block-2']);

    if (!level) {
      const blockTitle = new BaseComponent(
        'p',
        ['game-sprint__block-2-title'],
        'Выбери уровень:',
      );
      const blockLevelButtons = new BaseComponent(
        'div',
        ['game-sprint__block-2-level-buttons'],
      );
      this.startGameButton.element.disabled = true;

      const difficultyGroup = Object.keys(WordDifficultyGroup)
        .sort((a, b) => a.localeCompare(b));
      const difficultyGroupVal = Object.values(WordDifficultyGroup);

      const arrayLevelButtons = difficultyGroup.map(difficulty => {
        return new ButtonBaseElement(
          [`game-sprint__button-${difficulty}`],
          difficulty,
        );
      });

      arrayLevelButtons.forEach(button => {
        button.element.addEventListener('click', () => {

          arrayLevelButtons.forEach(el => {
            el.element.classList.remove('active');
          });
          button.element.classList.add('active');
          this.startGameButton.element.disabled = false;

          const index = arrayLevelButtons.findIndex(val => val === button);
          this.selectedLevel = difficultyGroupVal[index];
        });



        blockLevelButtons.element.append(button.element);
      });

      block.element.append(blockTitle.element);
      block.element.append(blockLevelButtons.element);
      block.element.append(this.startGameButton.element);
    } else {
      const levelSelectedDescription = new BaseComponent(
        'p',
        ['game-sprint__level_selected'],
        GAME_SPRINT_LEVEL_SELECTED,
      );
      block.element.append(levelSelectedDescription.element);
      block.element.append(this.startGameButton.element);
    }
    return block;
  }
}
