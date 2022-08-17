export class BaseElement<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K];

  constructor(
    tagName: K,
    classes = '',
    innerText: string | undefined = undefined,
  ) {
    this.element = document.createElement(tagName);
    if (classes) {
      classes.split(' ').forEach((cls) => this.element.classList.add(cls));
    }
    if (innerText) {
      this.element.innerText = innerText;
    }
  }
}
