import express = require('express');

import { LoterieRoutes, SelectionRoutes, UtilisateurRoutes } from './';

let app = express();

export class Routes {
  get routes(): any {
    app.use('/loteries/', new LoterieRoutes().routes);
    app.use('/utilisateurs/', new UtilisateurRoutes().routes);
    app.use('/selections/', new SelectionRoutes().routes);

    return app;
  }
}
