import { BaseComponent } from '../../../shared/components/base-element/base-component';
import {
  GameAudiocallStartScreen,
} from '../game-audiocall-start-screen/game-audiocall-start-screen';
import { WordDifficultyGroup } from '../../../api/api-interfaces';

export class GameAudiocallRoot extends BaseComponent {
  element: HTMLDivElement;

  constructor(level: WordDifficultyGroup | null = null, private pageWords?: string) {
    super('div', ['game-audiocall__wrapper']);
    this.element.append(new GameAudiocallStartScreen(level, pageWords).element);
  }
}
