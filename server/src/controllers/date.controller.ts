import express = require('express');
import { DateBusiness } from './../app/business';

export class DateController {
  //Recupère les dates de tirage de la loterie selon son dernier tirage
  recuperer(req: express.Request, res: express.Response): void {
    try {
      let business: DateBusiness = new DateBusiness();
      let loterie: string = req.params.loterie;

      business.recupererTous(loterie, (error, tirages) => {
        if (error) res.send({'error': 'error'});
        else res.send(tirages);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }

  //Recupère les dates de tirage de la loterie pour l'année sélectionnée
  recupererParAnnee(req: express.Request, res: express.Response): void {
    try {
      let business: DateBusiness = new DateBusiness();
      let loterie: string = req.params.loterie;
      let annee: string = req.params.annee;

      business.recupererParAnnee(loterie, annee, (error, tirages) => {
        if (error) res.send({'error': 'error'});
        else res.send(tirages);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }
}
