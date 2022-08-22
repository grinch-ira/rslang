import { BaseElement } from '../../../utils/base-element/base-element';
import { ApplicationFeaturesTitle } from '../application-features-title/application-features-title';
import './features-wrapper.scss';

export class FeaturesWrapper extends BaseElement<'div'> {
  private ApplicationFeaturesTitle: ApplicationFeaturesTitle;

  constructor() {
    super('div', 'features-wrapper');
    this.ApplicationFeaturesTitle = new ApplicationFeaturesTitle();
    this.element.appendChild(this.ApplicationFeaturesTitle.element);
  }
}
