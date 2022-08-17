export interface IForm {
  isValid(): boolean;
  setParent(element: HTMLElement): void;
}

export interface IFormAutorization {
  validate(): boolean;
}

export interface IFormRegistration {
  validate(): boolean;
}

export interface IFormLogin {
  validate(): boolean;
}
