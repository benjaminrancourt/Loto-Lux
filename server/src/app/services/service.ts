import * as firebase from 'firebase';
import DataAccess from './../dataAccess/dataAccess';

export class Service {
  protected donnees: string;

  constructor (donnees: string) {
    this.donnees = donnees;
  }

  protected database(): firebase.database.Reference {
    return DataAccess.database(this.donnees);
  }

  protected gererErreur(error: any): Promise<void>  {
    console.error('Une erreur est survenue', error);
    return Promise.reject(error.message || error);
  }
}
