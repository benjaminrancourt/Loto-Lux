import firebase = require('firebase');

import { LoterieService, TirageService } from './../services';
import { JSONTirage } from './../model';

export class TirageBusiness {
  private loterieService: LoterieService;
  private tirageService: TirageService;

  constructor () {
    this.loterieService = new LoterieService();
    this.tirageService = new TirageService();
  }

  //Retourne tous les résultats des tirages d'une loterie
  //TODO : Si la loterie existe LoterieService
  recuperer(loterie: string): firebase.Promise<JSONTirage[]> {
    this.tirageService.nomDonnees = loterie;
    return this.tirageService.recuperer();
  }

  //Retourne tous les résultats d'un tirage d'une loterie
  //TODO : Si la loterie existe LoterieService
  //TODO : Si la date existe DateService
  recupererParDate(loterie: string, date: string): firebase.Promise<JSONTirage> {
    this.tirageService.nomDonnees = loterie;
    return this.tirageService.recupererParDate(date);
  }

  //Retourne tous les résultats d'un tirage d'une loterie
  //TODO : Si la loterie existe LoterieService
  //TODO : Si la date existe DateService
  recupererDernierTirage(loterie: string): firebase.Promise<JSONTirage> {
    return this.loterieService.recupererDateDernierTirage(loterie)
      .then((date) => {
        this.tirageService.nomDonnees = loterie;
        return this.tirageService.recupererParDate(date);
    });
  }
}
