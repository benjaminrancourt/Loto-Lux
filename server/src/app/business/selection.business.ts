import { SelectionService } from './../services';

export class SelectionBusiness {
  private service: SelectionService;

  private courriel: string;
  private token: string;

  constructor (courriel: string, token: string) {
    this.service = new SelectionService(courriel, token);
    this.courriel = courriel;
    this.token = token;
  }

  //Recupère les sélections de l'utilisateur
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  recuperer(loterie: string, date: string, callback: (error: any, selections: number[][]) => void): void {
    this.service.recuperer(loterie, date.split('-'), callback);
  }

  //Ajoute les sélections de l'utilisateur dans la base de données
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  ajouter(loterie: string, date: string, selections: number[][], callback: (error: any) => void): void {
    this.service.ajouter(loterie, date.split('-'), selections, callback);
  }

  //Supprime la sélection de l'utilisateur dans la base de dommées
  //TODO: Valider utilisateur
  //TODO: Valider loterie
  //TODO: Valider date
  supprimer(loterie: string, date: string, id: string, callback: (error: any) => void): void {
    this.service.supprimer(loterie, date.split('-'), id, callback);
  }
}
