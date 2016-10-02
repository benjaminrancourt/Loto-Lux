import firebase = require('firebase');

import { LoterieService } from './../services';
import { Loterie } from './../model';

export class LoterieBusiness {
  private service: LoterieService;

  constructor () {
    this.service = new LoterieService();
  }

  //Retourne les informations de toutes les loteries
  recuperer(): firebase.Promise<Loterie[]> {
    return this.service.recuperer();
  }

  //Retourne les informations d'une loterie en particulier
  recupererParURL(loterie: string): firebase.Promise<Loterie> {
    return this.service.recupererParURL(loterie);
  }
}
