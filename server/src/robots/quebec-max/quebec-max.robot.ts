import { Robot } from './..';
import { QuebecMaxLoterie } from './quebec-max.loterie';

export class QuebecMaxRobot extends Robot<QuebecMaxLoterie> {
  constructor() { super(QuebecMaxLoterie); }
}
