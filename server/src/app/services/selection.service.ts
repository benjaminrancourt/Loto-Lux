import DataAccess from './../dataAccess/dataAccess';
import { UtilisateurService } from './';
import { ISelection} from './../model';

export class SelectionService {
  private nomDonnees: string;
  private courriel: string;
  private token: string;

  constructor(courriel: string, token: string) {
    this.nomDonnees = 'selections';
    this.courriel = courriel;
    this.token = token;
  }

  //Recupère les sélections de l'utilisateur
  recuperer(loterie: string, date: string[], callback: (error: any, selections: ISelection[]) => void): void {
    DataAccess.database(this.nomDonnees)
      .child(loterie)
      .child(date[0]).child(date[1]).child(date[2])
      .child(UtilisateurService.encoderCourriel(this.courriel))
      .once('value', (snapshot) => {
        let selections: ISelection[] = [];

        snapshot.forEach((snap): boolean => {
          let selection: ISelection = {
            id: snap.key,
            nombres: snap.val()
          };
          selections.push(selection);

          return false;
        });

        selections.sort((a, b) => {
          let selectionA: string = a.nombres.join();
          let selectionB: string = b.nombres.join();

          if (selectionA < selectionB) return -1;
          if (selectionA > selectionB) return 1;
          return 0;
        });

        callback(null, selections.sort());
    });
  }

  //Ajoute les sélections de l'utilisateur dans la base de données
  ajouter(loterie: string, date: string[], selections: string[][], callback: (error: any) => void): void {
    let donnees: any = DataAccess.database(this.nomDonnees)
      .child(loterie)
      .child(date[0]).child(date[1]).child(date[2])
      .child(UtilisateurService.encoderCourriel(this.courriel));

    for (let i = 0; i < selections.length; ++i) {
      donnees.push(selections[i]);
    }

    callback(null);
  }

  //Supprime la sélection de l'utilisateur dans la base de dommées
  supprimer(loterie: string, date: string[], id: string, callback: (error: any) => void): void {
    DataAccess.database(this.nomDonnees)
      .child(loterie)
      .child(date[0]).child(date[1]).child(date[2])
      .child(UtilisateurService.encoderCourriel(this.courriel))
      .child(id)
      .remove(callback);
  }
}
