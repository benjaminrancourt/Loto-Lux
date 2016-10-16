import firebase = require('firebase');

import { DateUtils } from './../../utils';
import { DateService, LoterieService, Service, UtilisateurService } from './../services';

export abstract class Business {
  private static ERREUR_DATE: string = 'La date %s n\'existe pas.';
  private static ERREUR_LOTERIE: string = 'La loterie %s n\'existe pas.';
  private static ERREUR_UTILISATEUR: string = 'L\'utilisateur n\'existe pas.';

  protected dateService: DateService;
  protected loterieService: LoterieService;
  protected utilisateurService: UtilisateurService;

  constructor() {
    this.dateService = new DateService();
    this.loterieService = new LoterieService();
    this.utilisateurService = new UtilisateurService();
  }

  protected existeDate(loterie: string, date: string): firebase.Promise<any> {
    let urlBD: string = loterie + '/' + DateUtils.stringToStringBD(date);
    return this.existe(this.dateService, urlBD, Business.ERREUR_DATE, date);
  }

  protected existeLoterie(loterie: string): firebase.Promise<any> {
    return this.existe(this.loterieService, loterie, Business.ERREUR_LOTERIE);
  }

  protected existeUtilisateur(utilisateur: string): firebase.Promise<any> {
    return this.existe(this.utilisateurService, utilisateur, Business.ERREUR_UTILISATEUR);
  }

  private existe(service: Service, texte: string, erreur: string, retour: string = texte): firebase.Promise<string> {
    return service.existe(texte)
      .then((existe) => {
        if (existe) {
          return firebase.Promise.resolve(retour);
        } else {
          return firebase.Promise.reject(erreur.replace('%s', texte));
        }
      });
  }
}
