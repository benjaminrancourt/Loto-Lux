import express = require('express');
import { DateBusiness } from './../app/business';
import { Controller } from './';

export class DateController extends Controller {
  //Recupère les dates de tirage de la loterie
  recupererParURL(req: express.Request, res: express.Response): void {
    let business: DateBusiness = new DateBusiness();
    let loterie: string = req.params.loterie;

    business.recupererParURL(loterie)
      .then((tirages) => res.send(tirages))
      .catch((erreur: any) => this.gererErreur(res, erreur));
  }
}
