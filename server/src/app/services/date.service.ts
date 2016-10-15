import { DonneeDateService } from './';
import { Date, JSONDate } from './../model';

export class DateService extends DonneeDateService<Date, JSONDate> {
  constructor (nom?: string) {
    super('dates', nom);
  }
}
