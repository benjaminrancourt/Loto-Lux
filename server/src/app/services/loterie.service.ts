import firebase = require('firebase');

import { Loterie, IJSONTirage } from './../model';
import { Service } from './';

export class LoterieService extends Service {
  constructor () {
    super('loteries');
  }

  //Crée une loterie dans la base de données
  public creer(loterie: Loterie): firebase.Promise<any> {
    return this.database().child(loterie.url).set(loterie)
      .catch(this.gererErreur);
  }

  //Met à jour le dernier tirage
  public mettreAJourDernierTirage(url: string, dernierTirage: IJSONTirage): firebase.Promise<any> {
    return this.database().child(url).child('dernierTirage').set(dernierTirage)
      .catch(this.gererErreur);
  }

  //Permet de récupérer la date du dernier tirage de la loterie
  public recupererDateDernierTirage(url: string): firebase.Promise<string> {
    return this.database().child(url).child('dernierTirage').once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          let tirage: IJSONTirage = snapshot.val();
          return firebase.Promise.resolve(tirage.date);
        } else {
          return firebase.Promise.reject('La date du dernier tirage de la loterie ' + url + ' n\'existe pas.');
        }
      })
      .catch(this.gererErreur);
  }

  //Supprime une loterie de la base de données
  public supprimer(loterie: Loterie): firebase.Promise<any> {
    return this.database().child(loterie.url).remove()
      .catch(this.gererErreur);
  }

  //Supprime les loteries de la base de données
  public supprimerLoteries(): firebase.Promise<any> {
    return this.database().remove()
      .catch(this.gererErreur);
  }

  //Permet de récupérer toutes les loteries
  public recuperer(): firebase.Promise<Loterie[]> {
    return this.database().once('value')
      .then((snapshot) => {
        let loteries: Loterie[] = [];

        snapshot.forEach((snap): boolean => {
          let loterie: Loterie = snap.val();
          loteries.push(loterie);

          return false;
        });

        return loteries;
      })
      .catch(this.gererErreur);
  }

  //Permet de récupérer une loterie selon son url
  public recupererParURL(url: string): firebase.Promise<Loterie> {
    return this.database().child(url).once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          return firebase.Promise.resolve(snapshot.val());
        } else {
          return firebase.Promise.reject('La loterie ' + url + ' n\'existe pas.');
        }
      })
      .catch(this.gererErreur);
  }
}
