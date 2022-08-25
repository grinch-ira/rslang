import './reset.scss';
import './style.scss';
import { Textbook } from './textbook';
import './variables.scss';

document.body.append(new Textbook().element);
