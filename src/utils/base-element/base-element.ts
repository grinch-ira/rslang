type AllHTMLKey = keyof HTMLElementTagNameMap;
type AllHTMLElements = HTMLElementTagNameMap[AllHTMLKey];
type InnerElement = string | undefined | AllHTMLElements | AllHTMLElements[];

export class BaseElement<K extends keyof HTMLElementTagNameMap> {
  element: HTMLElementTagNameMap[K];

  constructor(
    tagName: K,
    classes = '',
    inner: InnerElement = undefined,
  ) {
    this.element = document.createElement(tagName);
    if (classes) {
      classes.split(' ').forEach((cls) => this.element.classList.add(cls));
    }
    if (inner && Array.isArray(inner)) {
      inner.forEach((childElement) => {
        if (childElement) this.element.append(childElement);
      });
    } else if (inner && typeof inner === 'object') {
      this.element.append(inner);
    } else if (inner && typeof inner === 'string') this.element.innerHTML = inner;
  }
}
