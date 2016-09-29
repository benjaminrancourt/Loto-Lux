import firebase = require('firebase');

import { UtilisateurService } from './../services';
import { JSONUtilisateur } from './../model';

export class UtilisateurBusiness {
  private service: UtilisateurService;

  constructor () {
    this.service = new UtilisateurService();
  }

  //Enregistre l'utilisateur dans la base de données
  public enregistrer(utilisateur: JSONUtilisateur): firebase.Promise<any> {
    return this.service.enregistrer(utilisateur);
  }
}
