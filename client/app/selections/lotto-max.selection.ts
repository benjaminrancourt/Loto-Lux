import { Selection, ISelectionOptions } from './';

export class LottoMaxSelection extends Selection {
  public static URL: string = 'lotto-max';

  constructor() {
    let options: ISelectionOptions = {
       maximum: 49,
       minimum: 1,
       nbreNumeros: 7,
       numSelectionsMin: 3,
       regex: '([0]?[1-9]|[1-4][0-9])',
       trie: true,
       verifieDuplicat: true,
       zeros: true
    };

    super(options);
  }
}
