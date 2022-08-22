import { BaseElement } from '../../../utils/base-element/base-element';
import { HeaderLogo } from '../header-logo/header-logo';
import { HeaderLinkList } from '../header-link-list/header-link-list';
import './header-wrapper.scss';

export class HeaderWrapper extends BaseElement<'div'> {
  private HeaderLogo: HeaderLogo;

  private HeaderLinkList: HeaderLinkList;

  constructor() {
    super('div', 'header-wrapper');
    this.HeaderLogo = new HeaderLogo();
    this.HeaderLinkList = new HeaderLinkList();
    this.element.appendChild(this.HeaderLogo.element);
    this.element.appendChild(this.HeaderLinkList.element);
  }
}
