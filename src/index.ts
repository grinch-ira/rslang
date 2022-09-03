import './reset.scss';
import './style.scss';
import './variables.scss';
import { SessionSaver } from './core/services/session-saver/session-saver';
import { App } from './routing/components/routing';

const app = new App();
window.onload = () => {
  SessionSaver.getInstance();
  app.run();
};

