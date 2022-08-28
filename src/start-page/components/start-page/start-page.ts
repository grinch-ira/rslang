
import { MainWrapperImage } from '../main-wrapper-image/main-wrapper-image';
import { FeaturesWrapper } from '../features-wrapper/features-wrapper';
import { DevelopersWrapper } from '../developers-wrapper/developers-wrapper';
import './start-page.scss';
import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class StartPage extends BaseComponent {

  private mainWrapperImage: MainWrapperImage;

  private featuresWrapper: FeaturesWrapper;

  private developerWrapper: DevelopersWrapper;


  constructor() {
    super('div', ['start-page']);
    this.mainWrapperImage = new MainWrapperImage();
    this.featuresWrapper = new FeaturesWrapper();
    this.developerWrapper = new DevelopersWrapper();
    this.element.append(this.mainWrapperImage.element);
    this.element.append(this.featuresWrapper.element);
    this.element.append(this.developerWrapper.element);

  }
}
