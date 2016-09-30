import { Loterie, ILoterieOptions } from './../../app/model';

export class Extra extends Loterie {
  constructor() {
    let options: ILoterieOptions = {
      nom: 'Extra',
      url: 'extra',

      avecComplementaire: false,
      avecSeparateur: false,
      couleur: '#678636',

      frequence: [0, 1, 2, 3, 4, 5, 6],
      noProduit: 205,
      avecResultatsSecondaires: false,

      premierTirage: { date: '1990-04-04' }
    };
    super(options);
  }
}
