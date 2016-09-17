import express = require('express');
import { UtilisateurController } from './../../controllers';

let router = express.Router();

export class UtilisateurRoutes {
  private utilisateurController: UtilisateurController;

  constructor() {
    this.utilisateurController = new UtilisateurController();
  }

  get routes(): any {
    router.post('/connexion', this.utilisateurController.enregistrer);
    return router;
  }
}
