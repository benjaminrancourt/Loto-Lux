import express = require('express');
import { TirageBusiness } from './../app/business';

export class TirageController {
  //Recupère tous les résultats des tirages d'une loterie
  recuperer(req: express.Request, res: express.Response): void {
    try {
      let business: TirageBusiness = new TirageBusiness();
      let loterie: string = req.params.loterie;

      business.recuperer(loterie, (error, tirages) => {
        if (error) res.send({'error': 'error'});
        else res.send(tirages);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }

  //Recupère les résultats du dernier tirage de la loterie
  recupererDernierTirage(req: express.Request, res: express.Response): void {
    try {
      let business: TirageBusiness = new TirageBusiness();
      let loterie: string = req.params.loterie;

      business.recupererDernierTirage(loterie, (error, tirages) => {
        if (error) res.send({'error': 'error'});
        else res.send(tirages);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }

  //Recupère les résultats d'un tirage en particulier
  recupererParDate(req: express.Request, res: express.Response): void {
    try {
      let loterie: string = req.params.loterie;
      let date: string = req.params.date;
      let business: TirageBusiness = new TirageBusiness();

      business.recupererParDate(loterie, date, (error, tirage) => {
        if (error) res.send({'error': 'error'});
        else res.send(tirage);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }
}
