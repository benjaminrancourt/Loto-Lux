import express = require('express');
import { TirageBusiness } from './../app/business';
import { Controller } from './';

export class TirageController extends Controller {
  //Recupère tous les résultats des tirages d'une loterie
  recuperer(req: express.Request, res: express.Response): void {
    let business: TirageBusiness = new TirageBusiness();
    let loterie: string = req.params.loterie;

    business.recuperer(loterie)
      .then((tirages) => res.send(tirages))
      .catch((erreur: any) => this.gererErreur(res, erreur));
  }

  //Recupère les résultats du dernier tirage de la loterie
  recupererDernierTirage(req: express.Request, res: express.Response): void {
    let business: TirageBusiness = new TirageBusiness();
    let loterie: string = req.params.loterie;

    business.recupererDernierTirage(loterie)
      .then((tirages) => res.send(tirages))
      .catch((erreur: any) => this.gererErreur(res, erreur));
  }

  //Recupère les résultats d'un tirage en particulier
  recupererParDate(req: express.Request, res: express.Response): void {
      let loterie: string = req.params.loterie;
      let date: string = req.params.date;
      let business: TirageBusiness = new TirageBusiness();

      business.recupererParDate(loterie, date)
        .then((tirage) => res.send(tirage))
        .catch((erreur: any) => this.gererErreur(res, erreur));
  }
}
