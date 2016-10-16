import express = require('express');
import { UtilisateurController } from './../../controllers';

export class UtilisateurRoutes {
  private utilisateurController: UtilisateurController;

  constructor() {
    this.utilisateurController = new UtilisateurController();
  }

  get routes(): any {
    let router = express.Router();
    router.post('/connexion', this.utilisateurController.enregistrer);
    return router;
  }
}
