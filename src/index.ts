// import { FormAutorization } from './auth/forms/form-autorization/form-autorization';
import { FormLogin } from './auth/forms/form-login';
// import { FormRegistration } from './auth/forms/form-registration/form-registration';
import './reset.scss';
import './style.scss';
import './variables.scss';

// const frm = new FormAutorization();
// document.querySelector('body')?.append(frm.getHtmlTag());
// const frm2 = new FormRegistration();
// document.querySelector('body')?.append(frm2.getHtmlTag());
const auth = new FormLogin();
document.body.append(auth.getHtmlTag());
