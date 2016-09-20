import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Service } from './';

export interface ISelectionOptions {
  loterie: string;
  date: string;
  utilisateur: string;
  token: string;
  trie: boolean;
}

@Injectable()
export class SelectionService extends Service {
  constructor(private http: Http) {
    super('api/selections');
  }

  //Envoie les nouvelles sélections au serveur
  public ajouter(selOptions: ISelectionOptions, selections: number[][]): Promise<boolean> {
    let entetes: Headers = new Headers({ 'Content-Type': 'application/json' });
    let options: RequestOptions = new RequestOptions({ headers: entetes });

    let arrayURL = [selOptions.loterie, selOptions.date, selOptions.utilisateur, selOptions.token, 'ajouter'];
    let url: string = this.construireURL(arrayURL);
    let corps: string = selOptions.trie ? JSON.stringify(this.trier(selections)) : JSON.stringify(selections);

    return this.http.post(url, corps, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private trier(selections: number[][]): number[][] {
    let resultats: number[][] = [];
    for (let i = 0; i < selections.length; ++i) {
      resultats[i] = selections[i].sort((a, b) => a - b);
    }

    return resultats;
  }
}
