import express = require('express');
import HeroController from './../../controllers/HeroController';

let router = express.Router();

class HeroRoutes {
  private _heroController: HeroController;

  constructor() {
    this._heroController = new HeroController();
  }

  get routes(): any {
    let controller = this._heroController;

    router.get('/heroes', controller.retrieve);
    router.post('/heroes', controller.create);

    router.put('/heroes/:_id', controller.update);
    router.get('/heroes/:_id', controller.findById);
    router.delete('/heroes/:_id', controller.delete);

    return router;
  }
}

Object.seal(HeroRoutes);
export default HeroRoutes;
