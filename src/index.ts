import './reset.scss';
import './style.scss';
import { Textbook } from './textbook/textbook';
import './variables.scss';

document.body.append(new Textbook().getHtmlTag());
