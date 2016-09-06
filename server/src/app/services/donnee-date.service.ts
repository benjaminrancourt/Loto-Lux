import * as moment from 'moment';

import DataAccess from './../dataAccess/dataAccess';
import { DateUtils } from './../../config/utils';
import { IDonneeDate, JSONDonneeDate } from './../model';

export class DonneeDateService<T extends IDonneeDate, JSONT extends JSONDonneeDate> {
  private _nomDonnees: string;
  private base: string;

  constructor (base: string, nom?: string) {
    this.base = base;
    this._nomDonnees = nom && ('/' + this.base + '/' + nom) || '';
  }

  get nomDonnees(): string { return this._nomDonnees; }
  set nomDonnees(nom: string) { this._nomDonnees = '/' + this.base + '/' + nom; }

  //Crée une donnée dans la base de données
  public creer(donnee: T, callback: (error: any) => void): void {
    let date = DateUtils.momentToStringArray(donnee.date); delete donnee.date;
    DataAccess.database(this._nomDonnees)
      .child(date[0]).child(date[1]).child(date[2])
      .set(donnee, (error: any) => {
        donnee.date = DateUtils.stringArrayToMoment(date);
        callback(error);
      });
  }

  //Supprime une donnée de la base de données
  public supprimer(donnee: T, callback: (error: any) => void): void {
    let date = DateUtils.momentToStringArray(donnee.date);
    DataAccess.database(this._nomDonnees)
      .child(date[0]).child(date[1]).child(date[2])
      .remove(callback);
  }

  //Met à jour un tirage de la base de données
  public mettreAJour(donnee: T, callback: (error: any) => void): void {
    let date = DateUtils.momentToStringArray(donnee.date); delete donnee.date;
    DataAccess.database(this._nomDonnees)
      .child(date[0]).child(date[1]).child(date[2])
      .update(donnee, (error: any) => {
        donnee.date = DateUtils.stringArrayToMoment(date);
        callback(error);
      });
  }

  //Supprime toutes les données de la base de données
  public supprimerToutes(callback: (error: any) => void): void {
     DataAccess.database(this._nomDonnees).remove(callback);
  }

  //Permet de récupérer toutes les données
  public recuperer(callback: (erreur: any, donnees: JSONT[]) => void): void {
    DataAccess.database(this._nomDonnees).once('value', (snapshot) => {
      let donnees: JSONT[] = [];
      let date: string[] = [];

      snapshot.forEach((annees): boolean => {
        date[0] = annees.key;

        annees.forEach((mois): boolean => {
          date[1] = mois.key;

          mois.forEach((jour): boolean => {
            date[2] = jour.key;

            let tirage: JSONT = jour.val();
            tirage.date = DateUtils.stringArrayToString(date);
            donnees.push(tirage);

            return false;
          });

          return false;
        });

        return false;
      });

      callback(null, donnees);
    });
  }

  //Permet de récupérer des données selon la date
  public recupererParDate(date: moment.Moment, callback: (erreur: any, donnees: JSONT) => void): void {
    let tirageURL: string = this._nomDonnees + '/' + DateUtils.momentToStringBD(date);

    DataAccess.database(tirageURL).once('value', (snapshot) => {
      if (snapshot.exists()) {
        let donnee: JSONT = snapshot.val();
        donnee.date = DateUtils.momentToString(date);
        callback(null, donnee);
      } else {
        callback(false, null);
      }
    });
  }
}
