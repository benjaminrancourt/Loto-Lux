import express = require('express');
import { DateController,
  LoterieController,
  TirageController
} from './../../controllers';

let router = express.Router();

export class LoterieRoutes {
  private dateController: DateController;
  private loterieController: LoterieController;
  private tirageController: TirageController;

  constructor() {
    this.dateController = new DateController();
    this.loterieController = new LoterieController();
    this.tirageController = new TirageController();
  }

  get routes(): any {
    router.get('/', this.loterieController.recuperer);
    router.get('/:loterie', this.loterieController.recupererParURL);

    router.get('/:loterie/tirages', this.tirageController.recupererDernierTirage);
    router.get('/:loterie/tirages/:date', this.tirageController.recupererParDate);

    router.get('/:loterie/dates', this.dateController.recupererParURL);

    return router;
  }
}
