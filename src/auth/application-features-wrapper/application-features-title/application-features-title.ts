import { BaseElement } from '../../../utils/base-element/base-element';
import './application-features-title.scss';
export class ApplicationFeaturesTitle extends BaseElement<'div'> {
  constructor() {
    super(
      'div',
      'application-features-title',
      `Ваш следующий успех - не за горами <br>
      <span>чтобы стать к нему чуть-чуть ближе, 
      ознакомтесь с возможностями приложения</span>`,
    );
  }
}
