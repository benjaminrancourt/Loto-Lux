import { Loterie, ILoterieOptions } from './../../app/model';

export class LottoMaxLoterie extends Loterie {
  constructor() {
    let options: ILoterieOptions = {
      nom: 'Lotto Max',
      url: 'lotto-max',

      avecComplementaire: true,
      avecSeparateur: true,
      couleur: '#92C41D',

      frequence: [5],
      noProduit: 223,
      avecResultatsSecondaires: true,

      premierTirage: { date: '2009-09-25' }
    };
    super(options);
  }
}
