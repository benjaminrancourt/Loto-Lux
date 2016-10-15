import { Loterie, ILoterieOptions } from './../../app/model';

export class Lotto649Loterie extends Loterie {
  constructor() {
    let options: ILoterieOptions = {
      nom: 'Lotto 6/49',
      url: 'lotto-6-49',

      avecComplementaire: true,
      avecSeparateur: true,
      couleur: '#00538A',

      frequence: [3, 6],
      noProduit: 212,
      avecResultatsSecondaires: false,

      premierTirage: { date: '1982-06-12' }
    };
    super(options);
  }
}
