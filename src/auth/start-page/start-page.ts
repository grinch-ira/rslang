import { HeaderWrapper } from '../header/header-wrapper/header-wrapper';
import { MainWrapperImage } from '../main-wrapper-image-block/main-wrapper-image/main-wrapper-image';
import { FeaturesWrapper } from '../application-features-wrapper/features-wrapper/features-wrapper';
import { DevelopersWrapper } from '../about-developers/developers-wrapper/developers-wrapper';
import { Footer } from '../footer/footer';
import './start-page.scss';

export class StartPage {
  private headerWrapper: HeaderWrapper;

  private mainWrapperImage: MainWrapperImage;

  private featuresWrapper: FeaturesWrapper;

  private developerWrapper: DevelopersWrapper;

  private footer: Footer;

  constructor(private root: HTMLElement) {
    this.headerWrapper = new HeaderWrapper();
    this.mainWrapperImage = new MainWrapperImage();
    this.featuresWrapper = new FeaturesWrapper();
    this.developerWrapper = new DevelopersWrapper();
    this.footer = new Footer();
    this.root.append(this.headerWrapper.element);
    this.root.append(this.mainWrapperImage.element);
    this.root.append(this.featuresWrapper.element);
    this.root.append(this.developerWrapper.element);
    this.root.append(this.footer.element);
  }
}
