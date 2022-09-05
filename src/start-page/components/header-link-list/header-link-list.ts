import { SessionSaver } from '../../../core/services/session-saver/session-saver';
import { PageHash } from '../../../routing/components/routing';
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
    this.headerLinkMain = new BaseComponent('a', ['header-main'], 'Главная');
    this.headerLinkMain.element.setAttribute('href', '#main');
    this.headerLinkTextBook = new BaseComponent('a', ['header-textbook'], 'Учебник');
    this.headerLinkTextBook.element.setAttribute('href', '#textbook');
    this.headerLinkGame = new BaseComponent('a', ['header-game'], 'Игры');
    this.headerLinkGame.element.setAttribute('href', '#games');

    this.headerLinkStatistics = new BaseComponent(
      'a',
      ['header-statistics'],
      'Статистика',
    );
    this.headerLinkStatistics.element.setAttribute('href', '#');

    this.headerLinkLogin = new BaseComponent(
      'button',
      ['login', 'header-link-login'],
    );
    if (SessionSaver.getInstance().isActive) {
      this.headerLinkLogin.element.textContent = 'Выход';
      this.headerLinkLogin.element.addEventListener('click', () => {
        SessionSaver.getInstance().logout();
        const newUrl = document.URL.includes('#')
          ? document.URL.split('#')[0]
          : `${document.URL.split('#')[0]}#${PageHash.startPage}`;
        document.location = newUrl;
      });
    } else {
      this.headerLinkLogin.element.textContent = 'Вход';
      this.headerLinkLogin.element.addEventListener('click', () => {
        document.location = `${document.URL.split('#')[0]}#${PageHash.formLogin}`;
      });
    }
    this.headerLinkLogin.element.setAttribute('href', '#login');
    this.element.appendChild(this.headerLinkMain.element);
    this.element.appendChild(this.headerLinkTextBook.element);
    this.element.appendChild(this.headerLinkGame.element);
    this.element.appendChild(this.headerLinkStatistics.element);
    this.element.appendChild(this.headerLinkLogin.element);
  }
}
