import DataAccess from './../dataAccess/dataAccess';
import { DateUtils } from './../../config/utils';
import { DonneeDateService } from './';
import { Date, JSONDate } from './../model';

export class DateService extends DonneeDateService<Date, JSONDate> {
  constructor (nom?: string) {
    super('dates', nom);
  }

  recupererParAnnee(annee: string, callback: (error: any, result: any) => void): void {
    DataAccess.database(this.nomDonnees).child(annee).once('value', (snapshot) => {
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

      callback(null, donnees);
    });
  }
}
