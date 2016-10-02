import firebase = require('firebase');

import { DateUtils } from './../../config/utils';
import { DonneeDateService } from './';
import { Date, JSONDate } from './../model';

export class DateService extends DonneeDateService<Date, JSONDate> {
  constructor (nom?: string) {
    super('dates', nom);
  }

  recupererParAnnee(annee: string): firebase.Promise<JSONDate[]> {
    return this.database().child(annee).once('value').then((snapshot) => {
      let donnees: JSONDate[] = [];
      let date: string[] = [annee];

      snapshot.forEach((mois): boolean => {
        date[1] = mois.key;

        mois.forEach((jour): boolean => {
          date[2] = jour.key;

          let donnee: JSONDate = jour.val();
          donnee.date = DateUtils.stringArrayToString(date);
          donnees.push(donnee);

          return false;
        });

        return false;
      });

      return donnees;
    })
    .catch(this.gererErreur);
  }
}
