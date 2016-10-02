import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { DateTirage } from '../models';
import { Service } from './';

@Injectable()
export class DateService extends Service {
  constructor(private http: Http) {
    super('api/loteries');
  }

  recuperer(loterie: string): Promise<DateTirage[]> {
    return this.http.get(this.construireURL([loterie, 'dates']))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  recupererParAnnee(loterie: string, annee: string): Promise<DateTirage[]> {
    return this.http.get(this.construireURL([loterie, 'dates', annee]))
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
