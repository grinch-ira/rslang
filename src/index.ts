// import { Form } from './form-login/components/form';
import { FormAutorization } from './form-login/components/form-autorization';
import './reset.scss';
import './style.scss';
import './variables.scss';

const frm = new FormAutorization();
frm.setParent(document.querySelector('body') as HTMLElement);
