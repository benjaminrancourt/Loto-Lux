import { Loterie, ILoterieOptions } from './../../app/model';

export class QuebecMaxLoterie extends Loterie {
  constructor() {
    let options: ILoterieOptions = {
      nom: 'Québec Max',
      url: 'quebec-max',

      avecComplementaire: true,
      avecSeparateur: true,
      couleur: '#437324',

      frequence: [5],
      noProduit: 228,
      avecResultatsSecondaires: true,

      premierTirage: { date: '2012-10-19' }
    };
    super(options);
  }
}
