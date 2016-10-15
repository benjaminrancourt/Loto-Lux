import firebase = require('firebase');

import { DateUtils } from './../../utils';
import { IDonneeDate, JSONDonneeDate } from './../model';
import { Service } from './';

export class DonneeDateService<T extends IDonneeDate, JSONT extends JSONDonneeDate>
  extends Service {
  private base: string;

  constructor(base: string, nom?: string) {
    super(base);
    this.base = base;
    this.donnees = (nom && (this.base + '/' + nom)) || this.base;
  }

  get nomDonnees(): string { return this.donnees; }
  set nomDonnees(nom: string) { this.donnees = this.base + '/' + nom; }

  //Crée une donnée dans la base de données
  public creer(donnee: T): firebase.Promise<any> {
    let date: string = DateUtils.momentToStringBD(donnee.date); delete donnee.date;
    return this.database().child(date).set(donnee)
      .then(() => { donnee.date = DateUtils.stringToMoment(date); })
      .catch(this.gererErreur);
  }

  //Supprime une donnée de la base de données
  public supprimer(donnee: T): firebase.Promise<any> {
    let date = DateUtils.momentToStringBD(donnee.date);
    return this.database().child(date).remove()
      .catch(this.gererErreur);
  }

  //Met à jour un tirage de la base de données
  public mettreAJour(donnee: T): firebase.Promise<any> {
    let date = DateUtils.momentToStringBD(donnee.date); delete donnee.date;
    return this.database().child(date).update(donnee)
      .then(() => { donnee.date = DateUtils.stringToMoment(date); })
      .catch(this.gererErreur);
  }

  //Supprime toutes les données de la base de données
  public supprimerToutes(): firebase.Promise<any> {
    return this.database().remove()
      .catch(this.gererErreur);
  }

  //Permet de récupérer toutes les données
  public recuperer(): firebase.Promise<JSONT[]> {
    return this.database().once('value').then((snapshot) => {
      let donnees: JSONT[] = [];
      let date: string[] = [];

      snapshot.forEach((annees): boolean => {
        date[0] = annees.key;

        annees.forEach((mois): boolean => {
          date[1] = mois.key;

          mois.forEach((jour): boolean => {
            date[2] = jour.key;

            let donnee: JSONT = jour.val();
            donnee.date = DateUtils.stringArrayToString(date);
            donnees.push(donnee);

            return false;
          });

          return false;
        });

        return false;
      });

      return donnees;
    })
    .catch(this.gererErreur);
  }

  //Permet de récupérer des données selon la date
  public recupererParDate(date: string): firebase.Promise<JSONT> {
    return this.database().child(DateUtils.stringToStringBD(date)).once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          let donnee: JSONT = snapshot.val();
          donnee.date = date;
          return firebase.Promise.resolve(donnee);
        } else {
          return firebase.Promise.reject('Les données n\'existent pas pour la date du ' + date);
        }
      })
      .catch(this.gererErreur);
  }
}
