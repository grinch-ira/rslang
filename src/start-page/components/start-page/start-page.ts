import { HeaderWrapper } from '../header-wrapper/header-wrapper';
import { MainWrapperImage } from '../main-wrapper-image/main-wrapper-image';
import { FeaturesWrapper } from '../features-wrapper/features-wrapper';
import { DevelopersWrapper } from '../developers-wrapper/developers-wrapper';
import { Footer } from '../footer/footer';
import './start-page.scss';
import { BaseComponent } from '../../../shared/components/base-element/base-component';

export class StartPage extends BaseComponent {
  private headerWrapper: HeaderWrapper;

  private mainWrapperImage: MainWrapperImage;

  private featuresWrapper: FeaturesWrapper;

  private developerWrapper: DevelopersWrapper;

  private footer: Footer;

  constructor() {
    super('div', ['start-page']);
    this.headerWrapper = new HeaderWrapper();
    this.mainWrapperImage = new MainWrapperImage();
    this.featuresWrapper = new FeaturesWrapper();
    this.developerWrapper = new DevelopersWrapper();
    this.footer = new Footer();
    this.element.append(this.headerWrapper.element);
    this.element.append(this.mainWrapperImage.element);
    this.element.append(this.featuresWrapper.element);
    this.element.append(this.developerWrapper.element);
    this.element.append(this.footer.element);
  }
}
