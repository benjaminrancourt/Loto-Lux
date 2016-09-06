import { Robot } from './';
import { Loterie } from './../app/model';

export class QuebecMaxRobot extends Robot {
  constructor() {
    let loterie: Loterie = new Loterie('Québec Max', 'quebec-max', true, true, '#437324');
    super(loterie, [5], 228, '2012-10-19', true);
  }
}
