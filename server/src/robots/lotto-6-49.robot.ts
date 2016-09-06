import { Robot } from './';
import { Loterie } from './../app/model';

export class Lotto649Robot extends Robot {
  constructor() {
    let loterie: Loterie = new Loterie('Lotto 6/49', 'lotto-6-49', true, true, '#00538a');
    super(loterie, [3, 6], 212, '1982-06-12', false);
  }
}
