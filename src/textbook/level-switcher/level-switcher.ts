import { BaseElement } from '../../utils/base-element/base-element';
import './level-switcher.scss';

export class LevelSwitcher {
  private readonly htmlContainer: HTMLDivElement;

  private currentLevel: number;

  private refresh: () => void;

  constructor(update: () => void) {
    this.refresh = update;
    this.htmlContainer = new BaseElement('div', 'textbook__level-switcher').element;
    this.currentLevel = 0;
    for (let i = 0; i < 6; i += 1) {
      const item = new BaseElement(
        'button',
        'textbook__level-button',
        `Level ${i + 1}`,
      ).element;
      item.addEventListener('click', () => {
        this.currentLevel = i;
        this.refresh();
      });
      this.htmlContainer.append(item);
    }
  }

  getHtmlTag(): HTMLDivElement {
    return this.htmlContainer;
  }

  getCurrentLevel(): number {
    return this.currentLevel;
  }
}