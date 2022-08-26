export interface IForm {
  element: HTMLFormElement;
  get isValid(): boolean;
}

export enum FormErrorMsg {
  notValidEmailPassword = 'Неверный E-mail или пароль ;(',
  notValidInput = 'Скорее всего Вы допустили опечатку...',
  userAlreadyExist = 'Пользователь с таким E-mail`ом уже существует!!!',
}
