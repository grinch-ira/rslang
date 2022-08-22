import { HeaderWrapper } from '../header/header-wrapper/header-wrapper';
import { MainWrapperImage } from '../main-wrapper-image-block/main-wrapper-image/main-wrapper-image';
import { FeaturesWrapper } from '../application-features-wrapper/features-wrapper/features-wrapper';
import './start-page.scss';

export class StartPage {
  private HeaderWrapper: HeaderWrapper;

  private MainWrapperImage: MainWrapperImage;

  private FeaturesWrapper: FeaturesWrapper;

  constructor(private root: HTMLElement) {
    this.HeaderWrapper = new HeaderWrapper();
    this.MainWrapperImage = new MainWrapperImage();
    this.FeaturesWrapper = new FeaturesWrapper();
    this.root.append(this.HeaderWrapper.element);
    this.root.append(this.MainWrapperImage.element);
    this.root.append(this.FeaturesWrapper.element);
  }
}
