import firebase = require('firebase');

import { SelectionService } from './../services';
import { ISelection } from './../model';

export class SelectionBusiness {
  private service: SelectionService;
  private courriel: string;
  private token: string;

  constructor(courriel: string, token: string) {
    this.service = new SelectionService(courriel, token);
    this.courriel = courriel;
    this.token = token;
  }

  //Recupère les sélections de l'utilisateur
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  recuperer(loterie: string, date: string): firebase.Promise<ISelection[]> {
    return this.service.recuperer(loterie, date);
  }

  //Ajoute les sélections de l'utilisateur dans la base de données
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  ajouter(loterie: string, date: string, selections: string[][]): firebase.Promise<any> {
    return this.service.ajouter(loterie, date, selections);
  }

  //Supprime la sélection de l'utilisateur dans la base de dommées
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  supprimer(loterie: string, date: string, id: string): firebase.Promise<any> {
    return this.service.supprimer(loterie, date, id);
  }
}
