import { BaseElement } from '../../../utils/base-element/base-element';
import { HeaderLogo } from '../header-logo/header-logo';
import { HeaderLinkList } from '../header-link-list/header-link-list';
import './header-wrapper.scss';

export class HeaderWrapper extends BaseElement<'div'> {
  private headerLogo: HeaderLogo;

  private headerLinkList: HeaderLinkList;

  constructor() {
    super('div', 'header-wrapper');
    this.headerLogo = new HeaderLogo();
    this.headerLinkList = new HeaderLinkList();
    this.element.appendChild(this.headerLogo.element);
    this.element.appendChild(this.headerLinkList.element);
  }
}
