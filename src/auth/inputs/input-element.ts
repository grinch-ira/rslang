import { BuildElement } from '../../utils/element-builder/components/build-element';
import { IInputElement } from './interfaces/input-element';
import './input-element.scss';

export class InputElement implements IInputElement {
  private htmlElementContainer: HTMLDivElement;

  private compareRegExp: RegExp;

  private value: string;

  constructor(type: string, placeholder: string, compareRegExp: RegExp ) {
    this.compareRegExp = compareRegExp;
    const input =  new BuildElement('input')
      .addClass(['field__input'])
      .addDataAttribute([['type', type], ['placeholder', placeholder]])
      .addListeners([
        ['input', this.handle],
        ['blur', this.handle],
        ['focus', this.handle],
      ]).build() as HTMLInputElement;
    this.htmlElementContainer = new BuildElement('div')
      .addClass(['field']).addChild(input)
      .addListeners([['click', () => input.focus()]])
      .build() as HTMLDivElement;
    this.value = '';
  }

  public validate(): boolean {
    console.log(this.value.toLowerCase().match(this.compareRegExp));
    return !!this.value.toLowerCase().match(this.compareRegExp);
  }

  public getHtmlTag(): HTMLDivElement {
    return this.htmlElementContainer;
  }

  private handle = (e: Event | undefined) => {
    console.log(this.compareRegExp);
    if (e) {
      // console.log(e);
      switch (e.type) {
        case 'blur':
          // const value = (e.target as HTMLInputElement).value;
          if (this.validate()) {
            this.htmlElementContainer.classList.remove('invalid');
            this.htmlElementContainer.classList.add('valid');
          } else {
            this.htmlElementContainer.classList.remove('valid');
            this.htmlElementContainer.classList.add('invalid');
          }
          break;
        case 'input':
          this.value = (e.target as HTMLInputElement).value;
          break;
        case 'focus':
          this.htmlElementContainer.classList.remove('valid');
          this.htmlElementContainer.classList.remove('invalid');
      }
    }
  };
}
