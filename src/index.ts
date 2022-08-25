import { StartPage } from './start-page/components/start-page/start-page';
import './reset.scss';
import './style.scss';
import './variables.scss';


window.onload = () => {
  new StartPage(document.body);
};
