import { Selection, ISelectionOptions } from './';

export class Lotto649Selection extends Selection {
  public static URL: string = 'lotto-6-49';

  constructor() {
    let options: ISelectionOptions = {
      maximum: 49,
      minimum: 1,
      nbreNumeros: 6,
      regex: '([0]?[1-9]|[1-4][0-9])',
      trie: true,
      verifieDuplicat: true,
      zeros: true
    };

    super(options);
  }
}
