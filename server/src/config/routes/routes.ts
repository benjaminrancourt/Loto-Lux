import express = require('express');

import { LoterieRoutes, UtilisateurRoutes } from './';

let app = express();

export class Routes {
  get routes(): any {
    app.use('/loteries/', new LoterieRoutes().routes);
    app.use('/utilisateurs/', new UtilisateurRoutes().routes);

    return app;
  }
}
