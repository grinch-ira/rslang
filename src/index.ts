import { StartPage } from './start-page/components/start-page/start-page';
import './reset.scss';
import './style.scss';
import { Textbook } from './textbook';
import './variables.scss';
import { FormLogin } from './auth/components/form-login/form-login';

window.onload = () => {
  document.body.appendChild(new StartPage().element);
  document.body.append(new FormLogin().element);
  document.body.append(new Textbook().element);
};
