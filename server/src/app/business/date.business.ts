import firebase = require('firebase');

import { JSONDonneeDate } from './../model';
import { Business } from './';

export class DateBusiness extends Business {
  constructor () {
    super();
  }

  //Retourne toutes les dates d'une loterie
  recupererParURL(loterie: string): firebase.Promise<JSONDonneeDate[]> {
    this.dateService.nomDonnees = loterie;
    return this.existeLoterie(loterie)
      .then(() => this.dateService.recuperer());
  }

  protected retourneErreur(): firebase.Promise<any> {
    return firebase.Promise.reject('');
  }
}
