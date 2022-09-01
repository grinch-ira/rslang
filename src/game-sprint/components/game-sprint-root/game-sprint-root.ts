import { BaseComponent } from '../../../shared/components/base-element/base-component';
import {
  GameSprintStartScreen,
} from '../game-sprint-start-screen/game-sprint-start-screen';
import { WordDifficultyGroup } from '../../../api/api-interfaces';

export class GameSprintRoot extends BaseComponent {
  element: HTMLDivElement;

  constructor(level: WordDifficultyGroup | null) {
    super('div', ['game-sprint-wrapper']);
    this.element.append(new GameSprintStartScreen(level).element);
  }
}
