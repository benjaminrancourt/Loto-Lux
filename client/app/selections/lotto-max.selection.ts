import { Selection, ISelectionOptions } from './';

export class LottoMaxSelection extends Selection {
  public static URL: string = 'lotto-max';

  constructor() {
    let options: ISelectionOptions = {
       nbreNumeros: 7, minimum: 1, maximum: 49, verifieDuplicat: true, regex: '([0]?[1-9]|[1-4][0-9])'
    };

    super(options);
  }
}
