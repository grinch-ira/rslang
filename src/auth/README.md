To use this component, you need to import the module:

  import { FormLogin } from './auth/forms/form-login';

And also create an instance of this class and add HTML content using the class property ".element" to your HTML container.
For example:

  const auth = new FormLogin();
  document.body.append(auth.element);

After successful autorization, your localStorage will contain User Data by auth key in format:

  auth: {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
  }

If you create New User and this process completes successfully, the User will be automatically autentificated.

For tests, I use this code in the index.ts file:

  import { FormLogin } from './auth/forms/form-login';
  import './reset.scss';
  import './style.scss';
  import './variables.scss';

  const auth = new FormLogin();
  document.body.append(auth.element);
