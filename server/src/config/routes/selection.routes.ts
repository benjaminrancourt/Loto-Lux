import express = require('express');
import { SelectionController } from './../../controllers';

let router = express.Router();

export class SelectionRoutes {
  private controller: SelectionController;

  constructor() {
    this.controller = new SelectionController();
  }

  get routes(): any {
    router.get('/:loterie/:date/:courriel/:token', this.controller.recuperer);
    router.post('/:loterie/:date/:courriel/:token/ajouter', this.controller.ajouter);
    router.post('/:loterie/:date/:courriel/:token/supprimer', this.controller.supprimer);

    return router;
  }
}
