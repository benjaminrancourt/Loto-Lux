import firebase = require('firebase');

import { DateService, LoterieService } from './../services';
import { DateUtils } from './../../config/utils';
import { JSONDonneeDate } from './../model';

export class DateBusiness {
  private dateService: DateService;
  private loterieService: LoterieService;

  constructor () {
    this.dateService = new DateService();
    this.loterieService = new LoterieService();
  }

  //Retourne les dates d'une loterie selon l'année de son dernier tirage
  //TODO : Si la loterie existe LoterieService
  recuperer(loterie: string): firebase.Promise<JSONDonneeDate[]> {
    return this.loterieService.recupererDateDernierTirage(loterie)
      .then((date) => {
        let arrayDate = DateUtils.stringToStringArray(date);
        this.dateService.nomDonnees = loterie;
        return this.dateService.recupererParAnnee(arrayDate[0]);
      });
  }

  //Retourne toutes les dates d'une loterie
  //TODO : Si la loterie existe LoterieService
  recupererTous(loterie: string): firebase.Promise<JSONDonneeDate[]> {
    this.dateService.nomDonnees = loterie;
    return this.loterieService.recupererParURL(loterie)
      .then((loterie) => this.dateService.recuperer());
  }

  //Retourne les dates d'une loterie selon son année
  //TODO : Si la loterie existe LoterieService
  recupererParAnnee(loterie: string, annee: string): firebase.Promise<JSONDonneeDate[]> {
    this.dateService.nomDonnees = loterie;
    return this.dateService.recupererParAnnee(annee);
  }
}
