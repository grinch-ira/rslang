export interface IForm {
  isValid(): boolean;
  getHtmlTag(): HTMLFormElement;
}

export enum FormErrorMsg {
  notValidEmailPassword = 'Неверный E-mail или пароль ;(',
  notVolidInput = 'Скорее всего Вы допустили опечатку...',
  userAlreadyExist = 'Пользователь с таким E-mail`ом уже существует!!!',
}
