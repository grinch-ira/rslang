import { BaseElement } from '../../../utils/base-element/base-element';
import './header-logo.scss';

export class HeaderLogo extends BaseElement<'div'> {
  constructor() {
    super('div', 'header-logo', 'RSLang');
  }
}
