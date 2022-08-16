import {
  IBuildElement, AllHTMLElements, AllHTMLKey,
} from '../interfaces/build-element';

export class BuildElement implements IBuildElement {
  private element: AllHTMLElements;

  constructor(elemName: AllHTMLKey) {
    this.element = document.createElement(elemName);
  }

  addClass(classes: string[]): IBuildElement {
    this.element.classList.add(...classes);
    return this;
  }

  addChild(child: string | AllHTMLElements | AllHTMLElements[]): IBuildElement {
    if (child && Array.isArray(child)) {
      child.forEach((childElement) => {
        if (childElement) this.element.append(childElement);
      });
    } else if (child && typeof child === 'object') {
      this.element.append(child);
    } else if (child && typeof child === 'string') this.element.innerHTML = child;
    return this;
  }

  setParent(parent: HTMLElement): IBuildElement {
    parent.append(this.element);
    return this;
  }

  addDataAttribute(dataAttr: [string, string][]): IBuildElement {
    if (dataAttr) {
      (dataAttr).forEach(([attrName, attrValue]) => {
        if (attrValue === '') {
          if (attrName) this.element.setAttribute(attrName, '');
        } else {
          const elems = new RegExp(['value|id|placeholder|cols|rows|autocomplete',
            '|autocorrect|spellcheck|src|alt|type|href|title|name'].join(''));
          if (attrName.match(elems)) {
            this.element.setAttribute(attrName, attrValue);
          } else {
            this.element.dataset[attrName] = attrValue;
          }
        }
      });
    }
    return this;
  }

  addListeners(listeners: [listen: string,
    callback: (params?: Event | undefined) => void][]): IBuildElement {
    listeners.forEach(([listener, funct]) => {
      this.element.addEventListener(listener, funct);
    });
    return this;
  }

  build(): AllHTMLElements {
    return this.element;
  }
}
