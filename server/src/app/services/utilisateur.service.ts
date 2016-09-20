import DataAccess from './../dataAccess/dataAccess';
import { JSONUtilisateur } from './../model';

export class UtilisateurService {
  nomDonnees: string;

  //Remplacer '.' (non permis pour une clé Firebase) par ',' (non permis dans un adresse courriel)
  public static encoderCourriel(courriel: string): string {
    return courriel.toLowerCase().replace(/\./g, ',');
  }

  //Decode le courriel selon l'inverse de la méthode encoder
  public static decoderCourriel(courriel: string): string {
    return courriel.toLowerCase().replace(/\,/, '.');
  }

  constructor() {
    this.nomDonnees = 'utilisateurs';
  }

  //Enregistre l'utilisateur dans la base de données
  enregistrer(utilisateur: JSONUtilisateur, callback: (error: any) => void): void {
    DataAccess.database(this.nomDonnees)
      .child(UtilisateurService.encoderCourriel(utilisateur.courriel))
      .set(utilisateur, callback);
  }

  //Supprime un utilisateur dans la base de données
  supprimer(courriel: string, callback: (error: any) => void): void {
    DataAccess.database(this.nomDonnees)
      .child(UtilisateurService.encoderCourriel(courriel))
      .remove(callback);
  }

  //Vérifie si l'utilisateur est bien celui qu'il prétend être
  estCorrect(utilisateur: JSONUtilisateur, callback: (erreur: any, resultat: boolean) => void): void {
    DataAccess.database(this.nomDonnees)
      .child(UtilisateurService.encoderCourriel(utilisateur.courriel))
      .once('value', (snapshot) => {
      if (snapshot.exists()) {
        let resultat: JSONUtilisateur = snapshot.val();
        let correct: boolean = resultat.token === utilisateur.token && resultat.courriel === utilisateur.courriel;

        callback(null, correct);
      } else {
        callback(false, false);
      }
    });
  }
}
