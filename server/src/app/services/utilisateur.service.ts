import DataAccess from './../dataAccess/dataAccess';
import { JSONUtilisateur } from './../model';

export class UtilisateurService {
  nomDonnees: string;

  constructor() {
    this.nomDonnees = 'utilisateurs';
  }

  //Enregistre l'utilisateur dans la base de données
  enregistrer(utilisateur: JSONUtilisateur, callback: (error: any) => void): void {
    DataAccess.database(this.nomDonnees).child(this.encoderCourriel(utilisateur.courriel))
      .set(utilisateur, callback);
  }

  //Supprime un utilisateur dans la base de données
  supprimer(courriel: string, callback: (error: any) => void): void {
    DataAccess.database(this.nomDonnees).child(this.encoderCourriel(courriel))
      .remove(callback);
  }

  //Vérifie si l'utilisateur est bien celui qu'il prétend être
  estCorrect(utilisateur: JSONUtilisateur, callback: (erreur: any, resultat: boolean) => void): void {
    DataAccess.database(this.nomDonnees).child(this.encoderCourriel(utilisateur.courriel))
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

  //Remplacer '.' (non permis pour une clé Firebase) par ',' (non permis dans un adresse courriel)
  encoderCourriel(courriel: string): string {
    return courriel.toLowerCase().replace(/\./g, ',');
  }

  //Decode le courriel selon l'inverse de la méthode encoder
  decoderCourriel(courriel: string): string {
    return courriel.toLowerCase().replace(/\,/, '.');
  }
}
