import { BaseComponent } from '../base-element/base-component';

export class ButtonBaseElement extends BaseComponent {
  element: HTMLButtonElement;

  constructor(classes: string[], text?: string) {
    super('button', classes, text);
  }
}
