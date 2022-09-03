import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { IPublisher, ISubscriber } from '../../models/textbook-interfaces';
import './page-switcher.scss';

export class PageSwitcher extends BaseComponent implements IPublisher {
  private subscribers: ISubscriber[];

  private currentPage: number;

  private countPage: number;

  private pagePerSlide: number;

  private pages: HTMLButtonElement[];

  private sliderContainer: HTMLDivElement;

  private sliderWrapper: HTMLDivElement;

  private beforeWrapper: HTMLDivElement;

  private afterWrapper: HTMLDivElement;

  private BUTTON_WIDTH = 30;

  private BUTTON_GAP = 10;

  private matchWith5SliderButton: MediaQueryList;

  private matchWith3SliderButton: MediaQueryList;

  constructor(countPage: number) {
    super('div', ['textbook__page-switcher']);
    this.countPage = countPage;
    this.subscribers = [];
    this.pages = [];
    this.currentPage = 0;
    this.checkWindowWidth();
    this.sliderContainer = document.createElement('div');
    this.sliderContainer.classList.add('container');
    this.sliderWrapper = document.createElement('div');
    this.sliderWrapper.classList.add('wrapper');
    this.sliderWrapper.append(this.sliderContainer);
    this.beforeWrapper = document.createElement('div');
    this.beforeWrapper.classList.add('before-wrapper');
    this.afterWrapper = document.createElement('div');
    this.afterWrapper.classList.add('after-wrapper');
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

  setCurrentPage(pageNumber: number): void {
    if (pageNumber < this.countPage) {
      this.currentPage = pageNumber;
      this.switchSelectButtonStyle();
      this.renderPagination();
    }
  }

  initPageSwitcher(): void {
    const slideLeft = new BaseComponent(
      'button',
      ['textbook__page-button'],
    ).element;
    slideLeft.innerHTML = '&lt;&lt;';
    slideLeft.addEventListener('click', () => {
      if (this.currentPage) {
        this.currentPage -= this.pagePerSlide;

        if (this.currentPage < 0) {
          this.currentPage = 0;
        }

        this.refresh();
      }
    });
    const left = new BaseComponent('button',
      ['textbook__page-button']).element;
    left.innerHTML = '&lt;';
    left.addEventListener('click', () => {
      if (this.currentPage) {
        this.currentPage -= 1;
        this.refresh();
      }
    });
    const right = new BaseComponent('button',
      ['textbook__page-button']).element;
    right.innerHTML = '&gt;';
    right.addEventListener('click', () => {
      if (this.currentPage < this.countPage - 1) {
        this.currentPage += 1;
        this.refresh();
      }
    });
    const slideRight = new BaseComponent(
      'button',
      ['textbook__page-button'],
    ).element;
    slideRight.innerHTML = '&gt;&gt;';
    slideRight.addEventListener('click', () => {
      if (this.currentPage < this.countPage - 1) {
        this.currentPage += (this.currentPage + this.pagePerSlide < this.countPage - 1)
          ? this.pagePerSlide : this.countPage - (1 + this.currentPage);
        this.refresh();
      }
    });

    for (let i = 0; i < this.countPage; i++) {
      const pageButton = new BaseComponent(
        'button',
        ['textbook__page-button'],
        `${ i + 1 }`).element;
      pageButton.addEventListener('click', () => {
        this.currentPage = i;
        this.refresh();
      });
      this.pages.push(pageButton as HTMLButtonElement);
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
    this.refresh();
  }

  refresh() {
    this.notify();
    this.switchSelectButtonStyle();
    this.renderPagination();
  }

  renderPagination() {
    this.updateSliderWrapperWidth();

    if (this.currentPage > (2 + Math.floor(this.pagePerSlide / 2))) {
      this.beforeWrapper.innerHTML = '';
      this.beforeWrapper.append(
        new BaseComponent('button', ['textbook__page-button'], '...').element,
      );
      this.afterWrapper.innerHTML = '';

      if (this.currentPage > this.countPage - (4 + Math.floor(this.pagePerSlide / 2))) {
        this.afterWrapper.append(this.pages[this.pages.length - 2]);
      } else {
        this.afterWrapper.append(
          new BaseComponent('button', ['textbook__page-button'], '...').element,
        );
      }

    } else {
      this.beforeWrapper.innerHTML = '';
      this.beforeWrapper.append(this.pages[1]);
      this.afterWrapper.innerHTML = '';
      this.afterWrapper.append(
        new BaseComponent('button', ['textbook__page-button'], '...').element,
      );
    }
    // Move slider
    this.checkMoveSlider();
  }

  switchSelectButtonStyle() {
    this.pages.forEach((item, index) => {
      if (index === this.currentPage) {
        item.classList.add('select');
      } else {
        item.classList.remove('select');
      }
    });
  }

  updateSliderWrapperWidth() {
    this.sliderWrapper
      .style.width = `${this.BUTTON_WIDTH * this.pagePerSlide +
      this.BUTTON_GAP * (this.pagePerSlide - 1) + this.BUTTON_GAP * 2}px`;
  }

  // Move slider
  checkMoveSlider() {
    let mult = this.currentPage - 2 - Math.floor(this.pagePerSlide / 2);

    if (mult < 0) {
      mult = 0;
    }

    if (mult > (this.countPage - 4 - this.pagePerSlide)) {
      mult = this.countPage - 4 - this.pagePerSlide;
    }

    this.sliderContainer.style.left = `${
      this.BUTTON_GAP - (this.BUTTON_WIDTH + this.BUTTON_GAP) * mult
    }px`;
  }

  checkWindowWidth() {
    this.matchWith5SliderButton = window.matchMedia(
      `(max-width: ${Math.ceil((13 * (this.BUTTON_WIDTH + this.BUTTON_GAP)) / 0.8)}px)`,
    );
    this.matchWith5SliderButton.addEventListener('change', (e: MediaQueryListEvent) => {
      if (e.matches) {
        this.pagePerSlide = 5;
      } else {
        this.pagePerSlide = 7;
      }
      this.renderPagination();
    });
    this.matchWith3SliderButton = window.matchMedia(
      `(max-width: ${Math.ceil((11 * (this.BUTTON_WIDTH + this.BUTTON_GAP)) / 0.8)}px)`,
    );
    this.matchWith3SliderButton.addEventListener('change', (e: MediaQueryListEvent) => {
      if (e.matches) {
        this.pagePerSlide = 3;
      } else {
        this.pagePerSlide = 5;
      }
      this.renderPagination();
    });

    switch (true) {

      case this.matchWith3SliderButton.matches:
        this.pagePerSlide = 3;
        break;

      case this.matchWith5SliderButton.matches:
        this.pagePerSlide = 5;
        break;

      default:
        this.pagePerSlide = 7;
    }
  }
}
