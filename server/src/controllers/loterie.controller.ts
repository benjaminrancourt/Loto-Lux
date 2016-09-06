import express = require('express');
import { LoterieBusiness } from './../app/business';

export class LoterieController {
  //Recupère les informations de toutes les loteries
  recuperer(req: express.Request, res: express.Response): void {
    try {
      let business: LoterieBusiness = new LoterieBusiness();

      business.recuperer((error, loteries) => {
        if (error) res.send({'error': 'error'});
        else res.send(loteries);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }

  //Recupère les informations de la loterie
  recupererParURL(req: express.Request, res: express.Response): void {
    try {
      let business: LoterieBusiness = new LoterieBusiness();
      let loterie: string = req.params.loterie;

      business.recupererParURL(loterie, (error, tirages) => {
        if (error) res.send({'error': 'error'});
        else res.send(tirages);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }
}
