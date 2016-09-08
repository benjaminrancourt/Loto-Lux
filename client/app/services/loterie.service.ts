import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Loterie } from '../models/loterie.model';

@Injectable()
export class LoterieService {
  private url: string = 'api/loteries';  // URL to web api

  constructor(private http: Http) { }

  recuperer(): Promise<Loterie[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  recupererParURL(loterie: string): Promise<Loterie> {
    return this.http.get(this.url + '/' + loterie)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<void>  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
