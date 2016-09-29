import express = require('express');

import { LoterieBusiness } from './../app/business';
import { Loterie } from './../app/model';
import { Controller } from './';

export class LoterieController extends Controller {
  //Recupère les informations de toutes les loteries
  recuperer(req: express.Request, res: express.Response): void {
    let business: LoterieBusiness = new LoterieBusiness();

    business.recuperer()
      .then((loteries: Loterie[]) => res.send(loteries))
      .catch((erreur: any) => this.gererErreur(res, erreur));
  }

  //Recupère les informations de la loterie
  recupererParURL(req: express.Request, res: express.Response): void {
    let business: LoterieBusiness = new LoterieBusiness();
    let loterie: string = req.params.loterie;

    business.recupererParURL(loterie)
      .then((loterie: Loterie) => res.send(loterie))
      .catch((erreur: any) => this.gererErreur(res, erreur));
  }
}
