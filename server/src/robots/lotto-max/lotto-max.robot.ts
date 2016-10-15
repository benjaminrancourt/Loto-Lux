import { Robot } from './..';
import { LottoMaxLoterie } from './lotto-max.loterie';

export class LottoMaxRobot extends Robot<LottoMaxLoterie> {
  constructor() { super(LottoMaxLoterie); }
}
