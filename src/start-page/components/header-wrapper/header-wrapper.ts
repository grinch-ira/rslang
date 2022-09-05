import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { HeaderLinkList } from '../header-link-list/header-link-list';
import './header-wrapper.scss';

export class HeaderWrapper extends BaseComponent {
  private headerLogo: BaseComponent;

  private headerLinkList: HeaderLinkList;

  private headerContainer: BaseComponent;

  constructor() {
    super('header', ['header-wrapper']);
    this.headerContainer = new BaseComponent('div', ['header-container']);
    this.headerLogo = new BaseComponent('a', ['header-logo'], 'RSLang');
    this.headerLogo.element.setAttribute('href', '#main');
    this.headerLinkList = new HeaderLinkList();
    this.headerContainer.element.appendChild(this.headerLogo.element);
    this.headerContainer.element.appendChild(this.headerLinkList.element);
    this.element.appendChild(this.headerContainer.element);
  }
}
