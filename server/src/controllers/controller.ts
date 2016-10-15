import express = require('express');

export abstract class Controller {
   protected gererErreur(res: express.Response, erreur: any): void {
    console.log(erreur);
    res.send({'erreur': erreur});
  }
}
