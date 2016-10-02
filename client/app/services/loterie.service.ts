import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Loterie } from '../models/loterie.model';
import { Service } from './';

@Injectable()
export class LoterieService extends Service {
  constructor(private http: Http) {
    super('api/loteries');
  }

  recuperer(): Promise<Loterie[]> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  recupererParURL(loterie: string): Promise<Loterie> {
    return this.http.get(this.construireURL([loterie]))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
