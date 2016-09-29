import firebase = require('firebase');

import { JSONUtilisateur } from './../model';
import { Service } from './service';

export class UtilisateurService extends Service {
  //Remplacer '.' (non permis pour une clé Firebase) par ',' (non permis dans un adresse courriel)
  public static encoderCourriel(courriel: string): string {
    return courriel.toLowerCase().replace(/\./g, ',');
  }

  //Decode le courriel selon l'inverse de la méthode encoder
  public static decoderCourriel(courriel: string): string {
    return courriel.toLowerCase().replace(/\,/, '.');
  }

  constructor() {
    super('utilisateurs');
  }

  //Enregistre l'utilisateur dans la base de données
  enregistrer(utilisateur: JSONUtilisateur): firebase.Promise<any> {
    return this.database()
      .child(UtilisateurService.encoderCourriel(utilisateur.courriel))
      .set(utilisateur)
      .catch(this.gererErreur);
  }

  //Supprime un utilisateur dans la base de données
  supprimer(courriel: string): firebase.Promise<any> {
    return this.database()
      .child(UtilisateurService.encoderCourriel(courriel))
      .remove()
      .catch(this.gererErreur);
  }

  //Vérifie si l'utilisateur est bien celui qu'il prétend être
  estCorrect(utilisateur: JSONUtilisateur): firebase.Promise<boolean> {
    return this.database()
      .child(UtilisateurService.encoderCourriel(utilisateur.courriel))
      .once('value').then((snapshot) => {
      if (snapshot.exists()) {
        let resultat: JSONUtilisateur = snapshot.val();
        let correct: boolean = resultat.token === utilisateur.token && resultat.courriel === utilisateur.courriel;

        return firebase.Promise.resolve(correct);
      } else {
        return firebase.Promise.reject('L\'utilisateur ' + utilisateur.courriel + ' n\'existe pas.');
      }
    })
    .catch(this.gererErreur);
  }
}
