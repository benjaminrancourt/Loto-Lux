import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import { Service } from './';
import { ISelection } from './../models';
import { Selection } from './../selections';

export interface ISelectionOptions {
  loterie: string;
  date: string;
  utilisateur: string;
  token: string;
}

@Injectable()
export class SelectionService extends Service {
  constructor(private http: Http) {
    super('api/selections');
  }

  //Envoie les nouvelles sélections au serveur
  public ajouter(selOptions: ISelectionOptions, selections: number[][], selection: Selection): Promise<boolean> {
    let entetes: Headers = new Headers({ 'Content-Type': 'application/json' });
    let options: RequestOptions = new RequestOptions({ headers: entetes });

    let arrayURL = [selOptions.loterie, selOptions.date, selOptions.utilisateur, selOptions.token, 'ajouter'];
    let url: string = this.construireURL(arrayURL);
    let corps: string = JSON.stringify(selection.formatString(selections));

    return this.http.post(url, corps, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  //Récupère les sélections de l'utilisateur
  public recuperer(selOptions: ISelectionOptions): Promise<ISelection[]> {
    let arrayURL = [selOptions.loterie, selOptions.date, selOptions.utilisateur, selOptions.token];
    let url: string = this.construireURL(arrayURL);

    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
