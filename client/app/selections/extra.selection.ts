import { Selection, ISelectionOptions } from './';

export class ExtraSelection extends Selection {
  public static URL: string = 'extra';

  constructor() {
    let options: ISelectionOptions = {
      nbreNumeros: 7, minimum: 0, maximum: 9, regex: '[0-9]'
    };

    super(options);
  }
}
