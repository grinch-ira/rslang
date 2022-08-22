export interface IInputBaseElement {
  element: HTMLDivElement;
  validate(): boolean;
  getValue(): string;
}

export enum FieldValidateError {
  emptyField = 'Поле не может быть пустым',
  emailNotCorrect = 'Неверный E-mail',
  fieldCouldntContainNumber = 'Имя не должно содержать цифр',
  fieldCouldntContainSymbol = 'Имя не должно содержать спецсимволов',
  fieldNeedNumber = 'Пароль должен содержать хотябы одно число',
  fieldNeedSymbol =
  'Пароль должен содержать хотябы один спецсимвол из набора !@#$%^&*№;:=+-_',
  fieldNeedSmallLetter = 'Пароль должен содержать хотябы одну букву в нижнем регистре',
  fieldNeedUpperLetter = 'Пароль должен содержать хотябы одну букву в верхнем регистре',
  fieldNeedSixOrMoreLength = 'Пароль состоит не менее чем из 6-ти символов',
  notEqualyPassword = 'Блин, опять не совпадает...',
}

export enum FieldPlaceholder {
  enterPassword = 'Введите пароль',
  enterEmail = 'Введите E-mail',
  enterName = 'Имя',
  enterConfirmPassword = 'Подтвердите пароль',
}
