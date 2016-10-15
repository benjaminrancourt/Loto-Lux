import { DonneeDateService } from './';
import { Tirage, IJSONTirage } from './../model';

export class TirageService extends DonneeDateService<Tirage, IJSONTirage> {
  constructor (nom?: string) {
    super('tirages', nom);
  }
}
