import DataAccess from './../dataAccess/dataAccess';
import { Loterie, JSONTirage } from './../model';

export class LoterieService {
  private databaseName: string;

  constructor () {
    this.databaseName = 'loteries';
  }

  //Crée une loterie dans la base de données
  public creer(loterie: Loterie, callback: (error: any) => void): void {
    DataAccess.database(this.databaseName).child(loterie.url)
      .set(loterie, callback);
  }

  //Met à jour le dernier tirage
  public mettreAJourDernierTirage(url: string, dernierTirage: JSONTirage, callback: (erreur: any) => void): void {
    DataAccess.database(this.databaseName + '/' + url + '/dernierTirage')
      .set(dernierTirage, callback);
  }

  //Permet de récupérer la date du dernier tirage de la loterie
  public recupererDateDernierTirage(url: string, callback: (erreur: any, date: string) => void): void {
    DataAccess.database(this.databaseName + '/' + url + '/dernierTirage').once('value', (snapshot) => {
      if (snapshot.exists()) {
        let tirage: JSONTirage = snapshot.val();
        callback(null, tirage.date);
      } else {
        callback(false, null);
      }
    });
  }

  //Supprime une loterie de la base de données
  public supprimer(loterie: Loterie, callback: (error: any) => void): void {
    DataAccess.database(this.databaseName + '/' + loterie.url)
      .remove(callback);
  }

  //Supprime les loteries de la base de données
  public supprimerLoteries(callback: (error: any) => void): void {
     DataAccess.database(this.databaseName).remove(callback);
  }

  //Permet de récupérer toutes les loteries
  public recuperer(callback: (erreur: any, loteries: Loterie[]) => void): void {
    DataAccess.database(this.databaseName).once('value', (snapshot) => {
      let loteries: Loterie[] = [];

      snapshot.forEach((snap): boolean => {
        let loterie: Loterie = snap.val();
        loteries.push(loterie);

        return false;
      });

      callback(null, loteries);
    });
  }

  //Permet de récupérer une loterie selon son url
  public recupererParURL(url: string, callback: (erreur: any, loterie: Loterie) => void): void {
    DataAccess.database(this.databaseName + '/' + url).once('value', (snapshot) => {
      if (snapshot.exists()) {
        let loterie: Loterie = snapshot.val();
        callback(null, loterie);
      } else {
        callback(false, null);
      }
    });
  }

  //Permet de déterminer si la loterie a déjà été indexé
  public estIndexe(url: string, callback: (error: any, result: any) => void): void {
    DataAccess.database(this.databaseName).child(url).once('value', (snapshot) => {
      let existe: boolean = snapshot.exists();
      callback(null, existe);
    });
  }
}
