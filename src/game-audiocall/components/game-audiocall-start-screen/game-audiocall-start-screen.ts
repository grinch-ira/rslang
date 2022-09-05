import { BaseComponent } from '../../../shared/components/base-element/base-component';
import './game-audiocall-start-screen.scss';
import {
  GAME_AUDIOCALL_DESCRIPTION,
  GAME_AUDIOCALL_LEVEL_SELECTED,
  GAME_AUDIOCALL_TITLE,
} from '../../models/text';
import { WordDifficultyGroup } from '../../../api/api-interfaces';
import {
  ButtonBaseElement,
} from '../../../shared/components/button-base-element/button-base-element';
import {
  GameAudioCallActiveScreen,
} from '../game-audiocall-active-screen/game-audio-call-active-screen';

export class GameAudiocallStartScreen extends BaseComponent {

  element: HTMLDivElement;

  startGameButton: ButtonBaseElement;

  selectedLevel: WordDifficultyGroup;

  constructor(private level: WordDifficultyGroup | null, private pageWords?: string) {
    super('div', ['game-audiocall__start-screen']);
    window.scrollTo(0, 0);
    this.startGameButton = new ButtonBaseElement(
      ['game-audiocall__block-2-selected-button'],
      'Начать',
    );
    this.element.append(this.createBlock1().element);
    this.element.append(this.createBlock2(level).element);

    if (level) {
      this.selectedLevel = level;
    }

    this.startGameButton.element.addEventListener('click', () => {
      this.element.replaceWith(
        new GameAudioCallActiveScreen(this.selectedLevel, this.pageWords).element,
      );
    });
  }

  createBlock1() {
    const block = new BaseComponent('div', ['game-audiocall__block-1']);
    const title = new BaseComponent('p', ['game-audiocall__title'], GAME_AUDIOCALL_TITLE);
    const description = new BaseComponent(
      'p',
      ['game-audiocall__description'],
      GAME_AUDIOCALL_DESCRIPTION,
    );
    block.element.append(title.element, description.element);
    return block;
  }

  createBlock2(level: WordDifficultyGroup | null) {
    const block = new BaseComponent('div', ['game-audiocall__block-2']);

    if (!level) {
      const blockTitle = new BaseComponent(
        'p',
        ['game-audiocall__block-2-title'],
        'Выбери уровень:',
      );
      const blockLevelButtons = new BaseComponent(
        'div',
        ['game-audiocall__block-2-level-buttons'],
      );
      this.startGameButton.element.disabled = true;

      const difficultyGroup = Object.keys(WordDifficultyGroup)
        .sort((a, b) => a.localeCompare(b));
      const difficultyGroupVal = Object.values(WordDifficultyGroup);

      const arrayLevelButtons: ButtonBaseElement[] = [];
      for (let i = 0; i < 6; i++) {
        arrayLevelButtons.push(new ButtonBaseElement(
          [`game-audiocall__button-${difficultyGroup[i]}`, 'audiocall-level-button'],
          difficultyGroup[i],
        ));
      }

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
        ['game-audiocall__level_selected'],
        GAME_AUDIOCALL_LEVEL_SELECTED,
      );
      block.element.append(levelSelectedDescription.element);
      block.element.append(this.startGameButton.element);
    }
    return block;
  }
}
