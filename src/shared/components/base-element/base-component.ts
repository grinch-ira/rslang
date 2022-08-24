export class BaseComponent {
  element: HTMLElement;

  constructor(
    tagName: keyof HTMLElementTagNameMap,
    classes?: string[],
    textContent?: string,
  ) {
    this.element = document.createElement(tagName);

    if (classes) {
      classes.forEach((cls) => this.element.classList.add(cls));
    }

    if (textContent) {
      this.element.innerText = textContent;
    }
  }
}
