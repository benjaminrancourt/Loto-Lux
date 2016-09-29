import express = require('express');

import { UtilisateurBusiness } from './../app/business';
import { JSONUtilisateur } from './../app/model';
import { Controller } from './';

export class UtilisateurController extends Controller {
  //Enregistre l'utilisateur dans la base de données
  enregistrer(req: express.Request, res: express.Response): void {
    let business: UtilisateurBusiness = new UtilisateurBusiness();
    let utilisateur: JSONUtilisateur = req.body as JSONUtilisateur;

    business.enregistrer(utilisateur)
      .then(() => res.send(true))
      .catch((erreur: any) => this.gererErreur(res, erreur));
  }
}
