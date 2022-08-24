import { BaseElement } from '../../utils/base-element/base-element';
import { ImageBaseElement } from '../main-wrapper-image-block/image-base-element/image-base-element';
import './footer.scss';
export class Footer extends BaseElement<'div'> {
  private footerGitHubLink: BaseElement<'a'>;

  private footerGitHubImage: ImageBaseElement;

  private groupNumberAndYear: BaseElement<'div'>;

  constructor() {
    super('div', 'footer-wrapper');
    this.footerGitHubLink = new BaseElement('a', 'footer-github-link');
    this.footerGitHubLink.element.href =
      'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md';
    this.footerGitHubImage = new ImageBaseElement(
      'footer-github',
      '../assets/github.svg',
    );
    this.groupNumberAndYear = new BaseElement(
      'div',
      'group-number-year',
      'Group 127©, 2022',
    );

    this.footerGitHubLink.element.appendChild(this.footerGitHubImage.element);
    this.element.appendChild(this.footerGitHubLink.element);
    this.element.appendChild(this.groupNumberAndYear.element);
  }
}
