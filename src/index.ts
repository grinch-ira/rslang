import { FormAutorization } from './auth/forms/form-autorization';
import './reset.scss';
import './style.scss';
import './variables.scss';

const frm = new FormAutorization();
frm.setParent(document.querySelector('body') as HTMLElement);
