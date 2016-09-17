import express = require('express');
import { DateController,
  LoterieController,
  //SelectionController,
  TirageController,
  UtilisateurController
} from './../../controllers';

let router = express.Router();

export class LoterieRoutes {
  private dateController: DateController;
  private loterieController: LoterieController;
  //private selectionController: SelectionController;
  private tirageController: TirageController;
  private utilisateurController: UtilisateurController;

  constructor() {
    this.dateController = new DateController();
    this.loterieController = new LoterieController();
    //this.selectionController = new SelectionController();
    this.tirageController = new TirageController();
    this.utilisateurController = new UtilisateurController();
  }

  get routes(): any {
    router.get('/', this.loterieController.recuperer);
    router.get('/:loterie', this.loterieController.recupererParURL);
    router.get('/:loterie/tirages', this.tirageController.recupererDernierTirage);
    router.get('/:loterie/tirages/:date', this.tirageController.recupererParDate);
    //router.get('/:loterie/tirages/detail', this.controller.recupererDernierTirageDetail);
    //router.get('/:loterie/tirages/:date/detail', this.controller.recupererParDateDetail);
    router.get('/:loterie/dates', this.dateController.recuperer);
    router.get('/:loterie/dates/:annee', this.dateController.recupererParAnnee);
    //router.get('/:loterie/selections/:utilisateur', this.selectionController.recuperer);
    //router.get('/:loterie/selections/:utilisateur/:date', this.selectionController.recupererParDate);

    return router;
  }
}
