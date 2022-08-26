import { BaseComponent } from '../../../shared/components/base-element/base-component';
import { HeaderLinkList } from '../header-link-list/header-link-list';
import './header-wrapper.scss';

export class HeaderWrapper extends BaseComponent {
  private headerLogo: BaseComponent;

  private headerLinkList: HeaderLinkList;

  constructor() {
    super('header', ['header-wrapper']);
    this.headerLogo = new BaseComponent('div', ['header-logo'], 'RSLang');
    this.headerLinkList = new HeaderLinkList();
    this.element.appendChild(this.headerLogo.element);
    this.element.appendChild(this.headerLinkList.element);
  }
}
