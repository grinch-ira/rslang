import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class SprintPoints extends BaseComponent {
  element: HTMLDivElement;

  private points = 0;

  constructor() {
    super('div', ['sprint-points'], 'Очки: 0');
  }

  get value() {
    return this.points;
  }

  set value(value) {
    this.points = value;
  }

  increasePointsBy(value: number) {
    this.points += value;
  }

  renderPoints() {
    this.element.textContent = `Очки: ${this.points}`;
  }

}
