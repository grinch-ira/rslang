import { BaseElement } from '../../../utils/base-element/base-element';
import { HeaderLink } from '../header-link-base/header-link-base';
import './header-link-list.scss';

export class HeaderLinkList extends BaseElement<'div'> {

  private headerLinkMain: HeaderLink;

  private headerLinkTextBook: HeaderLink;

  private headerLinkGame: HeaderLink;

  private headerLinkStatistics: HeaderLink;

  private headerLinkLogin: HeaderLink;

  constructor() {
    super('div', 'header-link-list');
    this.headerLinkMain = new HeaderLink('Главная', 'main');
    this.headerLinkMain.element.setAttribute('href', '#');
    this.headerLinkTextBook = new HeaderLink('Учебник', 'textbook');
    this.headerLinkTextBook.element.setAttribute('href', '#');
    this.headerLinkGame = new HeaderLink('Игры', 'game');
    this.headerLinkGame.element.setAttribute('href', '#');
    this.headerLinkStatistics = new HeaderLink('Статистика', 'statistics');
    this.headerLinkStatistics.element.setAttribute('href', '#');
    this.headerLinkLogin = new HeaderLink('Вход', 'login');
    this.headerLinkLogin.element.setAttribute('href', '#');
    this.element.appendChild(this.headerLinkMain.element);
    this.element.appendChild(this.headerLinkTextBook.element);
    this.element.appendChild(this.headerLinkGame.element);
    this.element.appendChild(this.headerLinkStatistics.element);
    this.element.appendChild(this.headerLinkLogin.element);
  }
}
