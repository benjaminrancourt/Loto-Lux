import { Selection, ISelectionOptions } from './';

export class Lotto649Selection extends Selection {
  public static URL: string = 'lotto-6-49';

  constructor() {
    let options: ISelectionOptions = {
      nbreNumeros: 6, minimum: 1, maximum: 49, verifieDuplicat: true, regex: '([0]?[1-9]|[1-4][0-9])'
    };

    super(options);
  }
}
