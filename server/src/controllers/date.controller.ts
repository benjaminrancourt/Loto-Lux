import express = require('express');
import { DateBusiness } from './../app/business';
import { Controller } from './';

export class DateController extends Controller {
  //Recupère les dates de tirage de la loterie
  recuperer(req: express.Request, res: express.Response): void {
    let business: DateBusiness = new DateBusiness();
    let loterie: string = req.params.loterie;

    business.recupererTous(loterie)
      .then((tirages) => res.send(tirages))
      .catch((erreur: any) => this.gererErreur(res, erreur));
  }

  //Recupère les dates de tirage de la loterie pour l'année sélectionnée
  recupererParAnnee(req: express.Request, res: express.Response): void {
    let business: DateBusiness = new DateBusiness();
    let loterie: string = req.params.loterie;
    let annee: string = req.params.annee;

    business.recupererParAnnee(loterie, annee)
      .then((dates) => res.send(dates))
      .catch((erreur: any) => this.gererErreur(res, erreur));
  }
}
