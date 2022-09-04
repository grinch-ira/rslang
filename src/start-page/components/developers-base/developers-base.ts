import { BaseComponent } from '../../../shared/components/base-element/base-component';
// eslint-disable-next-line max-len
import { ImageBaseElement } from '../../../shared/components/image-base-element/image-base-element';

export class DevelopersContainerBase extends BaseComponent {
  imageContainer: ImageBaseElement;

  textContainer: BaseComponent;

  developerTitle: BaseComponent;

  developerSubtitle: BaseComponent;

  githubLink: BaseComponent;

  constructor(
    className: string,
    title: string,
    src: string,
    subtitle: string,
    url: string,
  ) {
    super('div', ['developer', 'about-dev', className]);

    this.imageContainer = new ImageBaseElement(`developer-${className}`, src);

    this.textContainer = new BaseComponent('div', ['developer-text-container']);

    this.developerTitle = new BaseComponent(
      'div',
      ['developer-title', className],
      title,
    );

    this.developerSubtitle = new BaseComponent(
      'div',
      ['developer-subtitle', className],
      subtitle,
    );

    this.githubLink = new BaseComponent('a', ['dev-github-link']);

    this.githubLink.element.setAttribute('href', url);
    this.element.appendChild(this.imageContainer.element);
    this.githubLink.element.appendChild(this.developerTitle.element);
    this.textContainer.element.appendChild(this.githubLink.element);
    this.textContainer.element.appendChild(this.developerSubtitle.element);
    this.element.appendChild(this.textContainer.element);
  }
}
