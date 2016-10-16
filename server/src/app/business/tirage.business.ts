import firebase = require('firebase');

import { TirageService } from './../services';
import { IJSONTirage } from './../model';
import { Business } from './';

export class TirageBusiness extends Business {
  private tirageService: TirageService;

  constructor () {
    super();
    this.tirageService = new TirageService();
  }

  //Retourne tous les résultats des tirages d'une loterie
  recuperer(loterie: string): firebase.Promise<IJSONTirage[]> {
    this.tirageService.nomDonnees = loterie;
    return this.existeLoterie(loterie)
      .then(() => this.tirageService.recuperer());
  }

  //Retourne tous les résultats d'un tirage d'une loterie
  recupererParDate(loterie: string, date: string): firebase.Promise<IJSONTirage> {
    this.tirageService.nomDonnees = loterie;

    return this.existeLoterie(loterie)
      .then(() => this.existeDate(loterie, date))
      .then(() => this.tirageService.recupererParDate(date));
  }

  //Retourne tous les résultats d'un tirage d'une loterie
  recupererDernierTirage(loterie: string): firebase.Promise<IJSONTirage> {
    return this.existeLoterie(loterie)
      .then(() => this.loterieService.recupererDateDernierTirage(loterie))
      .then((date) => this.existeDate(loterie, date))
      .then((date) => {
        this.tirageService.nomDonnees = loterie;
        return this.tirageService.recupererParDate(date);
      });
  }
}
