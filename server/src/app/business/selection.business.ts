import firebase = require('firebase');

import { SelectionService } from './../services';
import { ISelection } from './../model';
import { Business } from './';

export class SelectionBusiness extends Business {
  private selectionService: SelectionService;

  constructor() {
    super();
    this.selectionService = new SelectionService();
  }

  //Recupère les sélections de l'utilisateur
  recuperer(loterie: string, date: string, courriel: string, token: string): firebase.Promise<ISelection[]> {
    return this.utilisateurService.estCorrect(courriel, token)
      .then(() => this.existeLoterie(loterie))
      .then(() => this.existeDate(loterie, date))
      .then(() => this.selectionService.recuperer(loterie, date, courriel));
  }

  //Ajoute les sélections de l'utilisateur dans la base de données
  ajouter(loterie: string, date: string, courriel: string, token: string, selections: string[][]): firebase.Promise<any> {
    return this.utilisateurService.estCorrect(courriel, token)
      .then(() => this.existeLoterie(loterie))
      .then(() => this.existeDate(loterie, date))
      .then(() => this.selectionService.ajouter(loterie, date, courriel, selections));
  }

  //Supprime la sélection de l'utilisateur dans la base de dommées
  supprimer(loterie: string, date: string, courriel: string, token: string, id: string): firebase.Promise<any> {
    return this.utilisateurService.estCorrect(courriel, token)
      .then(() => this.existeLoterie(loterie))
      .then(() => this.existeDate(loterie, date))
      .then(() => this.selectionService.supprimer(loterie, date, courriel, id));
  }
}
