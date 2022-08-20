import { FieldPlaceholder, FieldValidateError } from '../../inputs/interfaces/inputs';
import { InputBaseElement } from '../input-base';

export class InputName extends InputBaseElement {
  constructor() {
    super('text', FieldPlaceholder.enterName, [
      [new RegExp('.{1,}', 'g'), FieldValidateError.emptyField],
      [new RegExp('^[^0-9]*$'), FieldValidateError.fieldCouldntContainNumber],
      [
        new RegExp('^[a-zA-Zа-яА-Я0-9\\s]*$'),
        FieldValidateError.fieldCouldntContainSymbol,
      ],
    ]);
  }
}
