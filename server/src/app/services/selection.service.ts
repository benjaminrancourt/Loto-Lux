import firebase = require('firebase');

import { Service } from './';
import { ISelection} from './../model';
import { CourrielUtils, DateUtils } from './../../utils';

export class SelectionService extends Service {
  private courriel: string;
  private token: string;

  constructor(courriel: string, token: string) {
    super('selections');
    this.courriel = courriel;
    this.token = token;
  }

  //Recupère les sélections de l'utilisateur
  recuperer(loterie: string, date: string): firebase.Promise<ISelection[]> {
    return this.database()
      .child(loterie)
      .child(DateUtils.stringToStringBD(date))
      .child(CourrielUtils.encoder(this.courriel))
      .once('value')
      .then((snapshot) => {
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

        return selections.sort();
    })
    .catch(this.gererErreur);
  }

  //Ajoute les sélections de l'utilisateur dans la base de données
  ajouter(loterie: string, date: string, selections: string[][]): firebase.Promise<any> {
    let promesses: any = [];
    let donnees: any = this.database()
      .child(loterie)
      .child(DateUtils.stringToStringBD(date))
      .child(CourrielUtils.encoder(this.courriel));

    for (let i = 0; i < selections.length; ++i) {
      promesses.push(donnees.push(selections[i]));
    }

    return firebase.Promise.all(promesses);
  }

  //Supprime la sélection de l'utilisateur dans la base de dommées
  supprimer(loterie: string, date: string, id: string): firebase.Promise<any> {
    return this.database()
      .child(loterie)
      .child(DateUtils.stringToStringBD(date))
      .child(CourrielUtils.encoder(this.courriel))
      .child(id)
      .remove()
      .catch(this.gererErreur);
  }
}
