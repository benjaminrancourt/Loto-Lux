import { Injectable }        from '@angular/core';
import { tokenNotExpired }   from 'angular2-jwt';

import { AuthConfiguration } from './auth.config';
import { Utilisateur }       from './../models';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  lock: any;
  utilisateur: Utilisateur;

  constructor() {
    this.lock = new Auth0Lock(AuthConfiguration.ID_CLIENT, AuthConfiguration.DOMAINE, AuthConfiguration.OPTIONS);
    this.lock.on('authenticated', (resultats) => this.authentification(resultats));
  }

  //Affiche la boîte de connexion
  public connexion(): void {
    this.lock.show();
  }

  //Retourne vrai si l'utilisateur s'est déjà authentifié
  public estAuthentifie(): boolean {
    return tokenNotExpired();
  }

  //Déconnecte l'utilisateur en supprimant ces informations locales
  public deconnexion(): void {
    console.log('deconnexion');
    localStorage.removeItem(AuthConfiguration.ID_TOKEN);
    localStorage.removeItem(AuthConfiguration.UTILISATEUR);
  }

  //Récupère le résultat de l'authentification pour aller chercher certaines informations de son profil
  private authentification(resultat: any): void {
    this.lock.getProfile(resultat.idToken, (erreur, profile) => {
      if (erreur) {
        alert(erreur);
        return;
      }

      this.utilisateur = new Utilisateur(resultat.idToken, profile);

      localStorage.setItem(AuthConfiguration.ID_TOKEN, resultat.idToken);
      localStorage.setItem(AuthConfiguration.UTILISATEUR, JSON.stringify(this.utilisateur));
    });
  }
}
