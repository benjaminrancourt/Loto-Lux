import * as firebase from 'firebase';
import DataAccess from './../dataAccess/dataAccess';

export abstract class Service {
  protected donnees: string;

  constructor (donnees: string) {
    this.donnees = donnees;
  }

  //Permet de déterminer si la donnée existe dans la base de données
  public existe(url: string): firebase.Promise<boolean>  {
    return this.database().child(url).once('value')
      .then((snapshot) => snapshot.exists())
      .catch(this.gererErreur);
  }

  protected database(): firebase.database.Reference {
    return DataAccess.database(this.donnees);
  }

  protected gererErreur(error: any): Promise<void>  {
    console.error('Une erreur est survenue', error);
    return Promise.reject(error.message || error);
  }
}
