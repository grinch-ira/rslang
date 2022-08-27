import { BaseComponent } from '../../../shared/components/base-element/base-component';
import {
  GameSprintStartScreen,
} from '../game-sprint-start-screen/game-sprint-start-screen';
import { WordDifficultyGroup } from '../../../api/api-interfaces';
import {
  GameSprintActiveScreen,
} from '../game-sprint-active-screen/game-sprint-active-screen';

export class GameSprintRoot extends BaseComponent {
  element: HTMLDivElement;

  main;

  constructor(level: WordDifficultyGroup | null) {
    super('div', ['game-sprint-wrapper']);
    this.main = new GameSprintStartScreen(level);
    this.main.startGameButton.element.addEventListener('click', () => {
      this.main.element.innerHTML = '';
      this.main.element.append(new GameSprintActiveScreen(this.main.selectedLevel).element);
    });
    this.element.append(this.main.element);
  }
}
