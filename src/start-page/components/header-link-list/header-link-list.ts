import { BaseComponent } from '../../../shared/components/base-element/base-component';
import './header-link-list.scss';

export class HeaderLinkList extends BaseComponent {
  private headerLinkMain: BaseComponent;

  private headerLinkTextBook: BaseComponent;

  private headerLinkGame: BaseComponent;

  private headerLinkStatistics: BaseComponent;

  private headerLinkLogin: BaseComponent;

  constructor() {
    super('nav', ['header-link-list']);
    this.headerLinkMain = new BaseComponent('a', ['main'], 'Главная');
    this.headerLinkMain.element.setAttribute('href', '#main');
    this.headerLinkTextBook = new BaseComponent('a', ['textbook'], 'Учебник');
    this.headerLinkTextBook.element.setAttribute('href', '#');
    this.headerLinkGame = new BaseComponent('a', ['game'], 'Игры');
    this.headerLinkGame.element.setAttribute('href', '#games');
    this.headerLinkStatistics = new BaseComponent(
      'a',
      ['statistics'],
      'Статистика',
    );
    this.headerLinkStatistics.element.setAttribute('href', '#');
    this.headerLinkLogin = new BaseComponent('a', ['login', 'header-link-login'], 'Вход');
    this.headerLinkLogin.element.setAttribute('href', '#login');
    this.element.appendChild(this.headerLinkMain.element);
    this.element.appendChild(this.headerLinkTextBook.element);
    this.element.appendChild(this.headerLinkGame.element);
    this.element.appendChild(this.headerLinkStatistics.element);
    this.element.appendChild(this.headerLinkLogin.element);
  }
}
