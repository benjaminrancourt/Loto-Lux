import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DateTirage } from '../models';

@Injectable()
export class DateService {
  private url: string = 'api/loteries';  // URL to web api

  constructor(private http: Http) { }

  recuperer(loterie: string): Promise<DateTirage[]> {
    return this.http.get(this.url + '/' + loterie + '/dates')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  recupererParAnnee(loterie: string, annee: string): Promise<DateTirage[]> {
    return this.http.get(this.url + '/' + loterie + '/dates/' + annee)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<void>  {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
