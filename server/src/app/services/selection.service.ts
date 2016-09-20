import DataAccess from './../dataAccess/dataAccess';
import { UtilisateurService } from './';

export class SelectionService {
  private nomDonnees: string;
  private courriel: string;
  private token: string;

  constructor(courriel: string, token: string) {
    this.nomDonnees = 'selections';
    this.courriel = courriel;
    this.token = token;
  }

  //Recupère les sélections de l'utilisateur
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  recuperer(loterie: string, date: string[], callback: (error: any, selections: number[][]) => void): void {
    //this.service.recuperer(loterie, date, callback);
  }

  //Ajoute les sélections de l'utilisateur dans la base de données
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  ajouter(loterie: string, date: string[], selections: number[][], callback: (error: any) => void): void {
    let donnees: any = DataAccess.database(this.nomDonnees)
      .child(loterie)
      .child(date[0]).child(date[1]).child(date[2])
      .child(UtilisateurService.encoderCourriel(this.courriel));

    for (let i = 0; i < selections.length; ++i) {
      donnees.push(selections[i]);
    }

    callback(null);
  }

  //Supprime la sélection de l'utilisateur dans la base de dommées
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  supprimer(loterie: string, date: string[], id: string, callback: (error: any) => void): void {
    DataAccess.database(this.nomDonnees)
      .child(loterie)
      .child(date[0]).child(date[1]).child(date[2])
      .child(UtilisateurService.encoderCourriel(this.courriel))
      .remove(callback);
  }
}
