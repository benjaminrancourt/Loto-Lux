import { DonneeDateService } from './';
import { Tirage, JSONTirage } from './../model';

export class TirageService extends DonneeDateService<Tirage, JSONTirage> {
  constructor (nom?: string) {
    super('tirages', nom);
  }
}
