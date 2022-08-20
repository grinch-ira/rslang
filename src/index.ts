import { FormLogin } from './auth/forms/form-login';
import './reset.scss';
import './style.scss';
import './variables.scss';

const auth = new FormLogin();
document.body.append(auth.getHtmlTag());
