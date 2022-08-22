import { BaseElement } from '../../../utils/base-element/base-element';
export class HeaderLink {
  element: HTMLAnchorElement;

  constructor(title: string, className: string) {
    this.element = new BaseElement(
      'a',
      `header-link-${className}`,
      title,
    ).element;
  }
}
