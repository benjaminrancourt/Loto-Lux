import express = require('express');

import { SelectionController } from './../../controllers';

export class SelectionRoutes {
  get routes(): any {
    let router = express.Router();
    let controller = new SelectionController();

    router.get('/:loterie/:date/:courriel/:token', controller.recuperer);
    router.post('/:loterie/:date/:courriel/:token/ajouter', controller.ajouter);
    router.delete('/:loterie/:date/:courriel/:token/supprimer/:id', controller.supprimer);

    return router;
  }
}
