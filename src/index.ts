import './reset.scss';
import './style.scss';
import './variables.scss';
import { App } from './routing/models/routing';

/* window.onload = () => {
  document.body.appendChild(new StartPage().element);
  document.body.append(new FormLogin().element);
};
 */
const app = new App();
app.run();
