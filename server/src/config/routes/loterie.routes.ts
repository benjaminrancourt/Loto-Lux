import express = require('express');
import { DateController,
  LoterieController,
  TirageController
} from './../../controllers';

export class LoterieRoutes {
  get routes(): any {
    let router = express.Router();
    let dateController = new DateController();
    let loterieController = new LoterieController();
    let tirageController = new TirageController();

    router.get('/', loterieController.recuperer);
    router.get('/:loterie', loterieController.recupererParURL);

    router.get('/:loterie/tirages', tirageController.recupererDernierTirage);
    router.get('/:loterie/tirages/:date', tirageController.recupererParDate);

    router.get('/:loterie/dates', dateController.recupererParURL);

    return router;
  }
}
