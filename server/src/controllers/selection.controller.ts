import express = require('express');

import { SelectionBusiness } from './../app/business';

export class SelectionController {
  //Recupère les sélections de l'utilisateur
  recuperer(req: express.Request, res: express.Response): void {
    try {
      let loterie: string = req.params.loterie;
      let date: string = req.params.date;
      let courriel: string = req.params.courriel;
      let token: string = req.params.token;
      let business: SelectionBusiness = new SelectionBusiness(courriel, token);

      business.recuperer(loterie, date, (error, selections) => {
        if (error) res.send({'error': 'error'});
        else res.send(selections);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }

  //Ajoute les sélections de l'utilisateur dans la base de données
  ajouter(req: express.Request, res: express.Response): void {
    try {
      let loterie: string = req.params.loterie;
      let date: string = req.params.date;
      let courriel: string = req.params.courriel;
      let token: string = req.params.token;
      let business: SelectionBusiness = new SelectionBusiness(courriel, token);
      let selections: string[][] = req.body as string[][];

      business.ajouter(loterie, date, selections, (error) => {
        if (error) res.send({'error': 'error'});
        else res.send(true);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }

  //Supprime les sélections de l'utilisateur dans la base de dommées
  supprimer(req: express.Request, res: express.Response): void {
    try {
      let loterie: string = req.params.loterie;
      let date: string = req.params.date;
      let courriel: string = req.params.courriel;
      let token: string = req.params.token;
      let business: SelectionBusiness = new SelectionBusiness(courriel, token);
      let id: string = req.params.id as string;

      business.supprimer(loterie, date, id, (error) => {
        if (error) res.send({'error': 'error'});
        else res.send(true);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }
}
