import { UtilisateurService } from './../services';
import { JSONUtilisateur } from './../model';

export class UtilisateurBusiness {
  private service: UtilisateurService;

  constructor () {
    this.service = new UtilisateurService();
  }

  //Enregistre l'utilisateur dans la base de données
  enregistrer(utilisateur: JSONUtilisateur, callback: (error: any) => void): void {
    console.log('UtilisateurBusiness ' + JSON.stringify(utilisateur));
    this.service.enregistrer(utilisateur, callback);
  }
}
