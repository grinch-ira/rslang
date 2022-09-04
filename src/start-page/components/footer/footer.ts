import { BaseComponent } from '../../../shared/components/base-element/base-component';
import './footer.scss';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer-wrapper']);

    const footerContent = document.createElement('div');
    footerContent.classList.add('footer-content');

    const footerGitContainer = document.createElement('div');
    footerGitContainer.classList.add('footer__author-link-container');

    const authorHeader = document.createElement('h2');
    authorHeader.classList.add('footer__author-header');
    authorHeader.textContent = 'Разработчики';


    footerGitContainer.append(
      authorHeader,
      this.getGitAuthor('Ирина', 'https://github.com/grinch-ira'),
      this.getGitAuthor('Антон', 'https://github.com/mldx'),
      this.getGitAuthor('Владимир', 'https://github.com/dyexplode'),
    );

    const footerCourse = document.createElement('a');
    footerCourse.setAttribute('href', 'https://rs.school/js/');

    const footerCourseImg = document.createElement('img');
    footerCourseImg.classList.add('footer__course-image');
    footerCourseImg.setAttribute('src', './assets/rs-school.svg');

    footerCourse.append(footerCourseImg);
    footerContent.append(footerGitContainer, footerCourse);

    const copy = new BaseComponent(
      'div',
      ['group-number-year'],
      'Team 127©, 2022',
    ).element;

    this.element.append(footerContent, copy);
  }

  private getGitAuthor(name: string, link: string): HTMLAnchorElement {
    const authorLink = document.createElement('a');
    authorLink.classList.add('footer__author-link');
    authorLink.setAttribute('href', link);
    const authorGit = document.createElement('img');
    authorGit.classList.add('footer__author-git');
    authorGit.setAttribute('src', './assets/github.svg');
    authorGit.setAttribute('alt', 'GitHub');
    const authorName = document.createElement('span');
    authorName.classList.add('footer__name');
    authorName.textContent = name;
    authorLink.append(authorGit, authorName);
    return authorLink;
  }
}
