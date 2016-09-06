import express = require('express');

import { LoterieRoutes } from './';

let app = express();

export class Routes {
  get routes(): any {
    app.use('/loteries/', new LoterieRoutes().routes);

    return app;
  }
}
