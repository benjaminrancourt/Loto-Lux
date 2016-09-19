import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import { AuthConfiguration } from './auth.config';
import { Utilisateur } from './../models';
import { Service } from './';

declare var Auth0Lock: any;

@Injectable()
export class AuthService extends Service {
  lock: any;
  utilisateur: Utilisateur;

  constructor(private http: Http) {
    super('api/utilisateurs');
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

      this.enregistrementConnexion().then((connexionEnregistree: boolean) => {
        if (connexionEnregistree) {
          localStorage.setItem(AuthConfiguration.ID_TOKEN, resultat.idToken);
          localStorage.setItem(AuthConfiguration.UTILISATEUR, JSON.stringify(this.utilisateur));
        }
      });
    });
  }

  //Demande l'enregistrement de la connexion au serveur
  private enregistrementConnexion(): Promise<boolean> {
    let url: string = this.construireURL(['connexion']);
    let corps: string = JSON.stringify(this.utilisateur);
    let entetes: Headers = new Headers({ 'Content-Type': 'application/json' });
    let options: RequestOptions = new RequestOptions({ headers: entetes });

    console.log('enregistrementConnexion ' + corps);

    return this.http.post(url, corps, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
