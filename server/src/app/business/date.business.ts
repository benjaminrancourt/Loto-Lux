import firebase = require('firebase');

import { DateService, LoterieService } from './../services';
import { JSONDonneeDate } from './../model';

export class DateBusiness {
  private dateService: DateService;
  private loterieService: LoterieService;

  constructor () {
    this.dateService = new DateService();
    this.loterieService = new LoterieService();
  }

  //Retourne toutes les dates d'une loterie
  //TODO : Si la loterie existe LoterieService
  recupererParURL(loterie: string): firebase.Promise<JSONDonneeDate[]> {
    this.dateService.nomDonnees = loterie;
    return this.loterieService.recupererParURL(loterie)
      .then((loterie) => this.dateService.recuperer());
  }
}
