import { BaseElement } from '../../../utils/base-element/base-element';
import { HeaderLink } from '../header-link-base/header-link-base';
import './header-link-list.scss';

export class HeaderLinkList extends BaseElement<'div'> {

  private HeaderLinkMain: HeaderLink;

  private HeaderLinkTextBook: HeaderLink;

  private HeaderLinkGame: HeaderLink;

  private HeaderLinkStatistics: HeaderLink;

  private HeaderLinkLogin: HeaderLink;

  constructor() {
    super('div', 'header-link-list');
    this.HeaderLinkMain = new HeaderLink('Главная', 'main');
    this.HeaderLinkMain.element.setAttribute('href', '#');
    this.HeaderLinkTextBook = new HeaderLink('Учебник', 'textbook');
    this.HeaderLinkTextBook.element.setAttribute('href', '#');
    this.HeaderLinkGame = new HeaderLink('Игры', 'game');
    this.HeaderLinkGame.element.setAttribute('href', '#');
    this.HeaderLinkStatistics = new HeaderLink('Статистика', 'statistics');
    this.HeaderLinkStatistics.element.setAttribute('href', '#');
    this.HeaderLinkLogin = new HeaderLink('Вход', 'login');
    this.HeaderLinkLogin.element.setAttribute('href', '#');
    this.element.appendChild(this.HeaderLinkMain.element);
    this.element.appendChild(this.HeaderLinkTextBook.element);
    this.element.appendChild(this.HeaderLinkGame.element);
    this.element.appendChild(this.HeaderLinkStatistics.element);
    this.element.appendChild(this.HeaderLinkLogin.element);
  }
}
