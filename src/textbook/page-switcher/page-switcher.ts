import { BaseElement } from '../../utils/base-element/base-element';
import { IPublisher, ISubscriber } from '../textbook-interfaces';
import './page-switcher.scss';

export class PageSwitcher extends BaseElement<'div'> implements IPublisher {
  private subscribers: ISubscriber[];

  private currentPage: number;

  private countPage: number;

  private pagePerSlide = 7;

  private pages: HTMLButtonElement[];

  private sliderContainer: HTMLDivElement;

  private sliderWrapper: HTMLDivElement;

  private beforeWrapper: HTMLDivElement;

  private afterWrapper: HTMLDivElement;

  private BUTTON_WIDTH = 30;

  private BUTTON_GAP = 10;

  constructor(countPage: number) {
    super('div', 'textbook__page-switcher');
    this.countPage = countPage;
    this.subscribers = [];
    this.pages = [];
    this.currentPage = 0;
    this.sliderContainer = new BaseElement('div', 'container').element;
    this.sliderWrapper = new BaseElement('div', 'wrapper', this.sliderContainer).element;
    this.beforeWrapper = new BaseElement('div', 'before-wrapper').element;
    this.afterWrapper = new BaseElement('div', 'after-wrapper').element;
    this.initPageSwitcher();
  }

  public register(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }

  public unregister(subscriber: ISubscriber): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
  }

  public notify(): void {
    this.subscribers.forEach((subscriber) => subscriber.update());
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  initPageSwitcher(): void {
    const slideLeft = new BaseElement(
      'button',
      'textbook__page-button',
      '&lt;&lt;',
    ).element;
    slideLeft.addEventListener('click', () => {
      if (this.currentPage) {
        this.currentPage -= this.pagePerSlide;
        if (this.currentPage < 0) this.currentPage = 0;
        this.refrash();
      }
    });
    const left = new BaseElement('button',
      'textbook__page-button', '&lt;').element;
    left.addEventListener('click', () => {
      if (this.currentPage) {
        this.currentPage -= 1;
        this.refrash();
      }
    });
    const right = new BaseElement('button',
      'textbook__page-button', '&gt;').element;
    right.addEventListener('click', () => {
      if (this.currentPage < this.countPage - 1) {
        this.currentPage += 1;
        this.refrash();
      }
    });
    const slideRight = new BaseElement(
      'button',
      'textbook__page-button',
      '&gt;&gt;',
    ).element;

    slideRight.addEventListener('click', () => {
      if (this.currentPage < this.countPage - 1) {
        this.currentPage += (this.currentPage + this.pagePerSlide < this.countPage - 1)
          ? this.pagePerSlide : this.countPage - (1 + this.currentPage);
        this.refrash();
      }
    });

    for (let i = 0; i < this.countPage; i++) {
      const pageButton = new BaseElement(
        'button',
        'textbook__page-button',
        `${ i + 1 }`).element;
      pageButton.addEventListener('click', () => {
        this.currentPage = i;
        this.refrash();
      });
      this.pages.push(pageButton);
    }

    this.element.append(
      slideLeft,
      left,
      this.pages[0],
      this.beforeWrapper,
      this.sliderWrapper,
      this.afterWrapper,
      this.pages[this.pages.length - 1],
      right,
      slideRight,
    );
    this.sliderContainer.append(...this.pages.slice(2, this.pages.length - 2));
    this.refrash();
  }

  refrash() {
    this.notify();
    this.switchSelectButton();
    this.updateSliderWidth();

    if (this.currentPage > (2 + Math.floor(this.pagePerSlide / 2))) {
      this.beforeWrapper.innerHTML = '';
      this.beforeWrapper.append(
        new BaseElement('button', 'textbook__page-button', '...').element,
      );
      this.afterWrapper.innerHTML = '';
      if (this.currentPage > this.countPage - (4 + Math.floor(this.pagePerSlide / 2))) {
        this.afterWrapper.append(this.pages[this.pages.length - 2]);
      } else {
        this.afterWrapper.append(
          new BaseElement('button', 'textbook__page-button', '...').element,
        );
      }

    } else {
      this.beforeWrapper.innerHTML = '';
      this.beforeWrapper.append(this.pages[1]);
      this.afterWrapper.innerHTML = '';
      this.afterWrapper.append(
        new BaseElement('button', 'textbook__page-button', '...').element,
      );
    }
    this.checkSlider();
  }

  switchSelectButton() {
    this.pages.forEach((item, index) => {
      if (index === this.currentPage) {
        item.classList.add('select');
      } else {
        item.classList.remove('select');
      }
    });
  }

  updateSliderWidth() {
    this.sliderWrapper
      .style.width = `${this.BUTTON_WIDTH * this.pagePerSlide +
      this.BUTTON_GAP * (this.pagePerSlide - 1) + this.BUTTON_GAP * 2}px`;
  }

  checkSlider() {
    let mult = this.currentPage - 2 - Math.floor(this.pagePerSlide / 2);
    if (mult < 0) mult = 0;
    if (mult > (this.countPage - 4 - this.pagePerSlide)) {
      mult = this.countPage - 4 - this.pagePerSlide;
    }
    this.sliderContainer.style.left = `${10 - 40 * mult}px`;
  }
}
