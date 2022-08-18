import { FormAutorization } from './auth/forms/form-autorization/form-autorization';
import { FormRegistration } from './auth/forms/form-registration/form-registration';
import './reset.scss';
import './style.scss';
import './variables.scss';

const frm = new FormAutorization();
document.querySelector('body')?.append(frm.getHtmlTag());
const frm2 = new FormRegistration();
document.querySelector('body')?.append(frm2.getHtmlTag());
// frm.setParent(document.querySelector('body') as HTMLElement);
