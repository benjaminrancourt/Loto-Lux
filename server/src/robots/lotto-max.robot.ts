import { Robot } from './';
import { Loterie } from './../app/model';

export class LottoMaxRobot extends Robot {
  constructor() {
    let loterie: Loterie = new Loterie('Lotto Max', 'lotto-max', true, true, '#92c41d');
    super(loterie, [5], 223, '2009-09-25', true);
  }
}
