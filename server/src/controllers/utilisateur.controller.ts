import express = require('express');

import { UtilisateurBusiness } from './../app/business';
import { JSONUtilisateur } from './../app/model';

export class UtilisateurController {
  //Enregistre l'utilisateur dans la base de données
  enregistrer(req: express.Request, res: express.Response): void {
    try {
      let business: UtilisateurBusiness = new UtilisateurBusiness();
      let utilisateur: JSONUtilisateur = req.body as JSONUtilisateur;

      console.log('UtilisateurController ' + JSON.stringify(utilisateur));

      business.enregistrer(utilisateur, (error) => {
        console.log('erreur = ' + error);
        if (error) res.send({'error': 'error'});
        else res.send(true);
      });
    }
    catch (e)  {
      res.send({'error': 'Erreur dans votre requête.'});
    }
  }
}
