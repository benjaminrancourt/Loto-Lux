import { Selection, ISelectionOptions } from './';

export class QuebecMaxSelection extends Selection {
  public static URL: string = 'quebec-max';

  constructor() {
    let options: ISelectionOptions = {
      nbreNumeros: 7, minimum: 1, maximum: 49, verifieDuplicat: true, regex: '([0]?[1-9]|[1-4][0-9])',
      numSelectionsMin: 3
    };

    super(options);
  }
}
