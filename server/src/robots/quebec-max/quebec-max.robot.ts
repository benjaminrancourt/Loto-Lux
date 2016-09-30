import { Robot } from './..';
import { QuebecMax } from './quebec-max.loterie';

export class QuebecMaxRobot extends Robot<QuebecMax> {
  constructor() { super(QuebecMax); }
}
