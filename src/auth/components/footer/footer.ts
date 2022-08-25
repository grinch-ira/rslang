import { BaseComponent } from '../../../shared/components/base-element/base-component';
// eslint-disable-next-line max-len
import { ImageBaseElement } from '../image-base-element/image-base-element';
import './footer.scss';
export class Footer extends BaseComponent {
  private footerGitHubLink: BaseComponent;

  private footerGitHubImage: ImageBaseElement;

  private groupNumberAndYear: BaseComponent;

  constructor() {
    super('div', ['footer-wrapper']);
    this.footerGitHubLink = new BaseComponent('a', ['footer-github-link']);
    this.footerGitHubLink.element.setAttribute('href', `https://github.com/
rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md`);
    this.footerGitHubImage = new ImageBaseElement(
      'footer-github',
      '../assets/github.svg',
    );
    this.groupNumberAndYear = new BaseComponent(
      'div',
      ['group-number-year'],
      'Group 127©, 2022',
    );

    this.footerGitHubLink.element.appendChild(this.footerGitHubImage.element);
    this.element.appendChild(this.footerGitHubLink.element);
    this.element.appendChild(this.groupNumberAndYear.element);
  }
}
