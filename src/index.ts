import { StartPage } from './start-page/components/start-page/start-page';
import './reset.scss';
import './style.scss';
import './variables.scss';
import { FormLogin } from './auth/components/form-login/form-login';
import { SessionSaver } from './core/services/session-saver/session-saver';


window.onload = () => {
  console.log(SessionSaver.getInstance().loadSessionFromLocalStorage());
  // SessionSaver.getInstance().loadSessionFromLocalStorage().then(console.log);

  document.body.appendChild(new StartPage().element);
  console.log('test');
  document.body.append(new FormLogin().element);
};
