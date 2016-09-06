/// <reference path="../typings/index.d.ts" />
import express = require('express');
import { Routes } from './config/routes/routes';
import bodyParser = require('body-parser');
import path = require('path');

import { Journal } from './config/utils';
import { Robots } from './robots/robots';

let journal: Journal = new Journal();
let port: number = process.env.PORT || 3000;
let app = express();

app.use('/app', express.static(path.resolve(__dirname, '../client/app')));
app.use('/libs', express.static(path.resolve(__dirname, '../client/libs')));
app.use('/css', express.static(path.resolve(__dirname, '../client/css')));
app.use('/scripts', express.static(path.resolve(__dirname, '../client/scripts')));
app.use('/images', express.static(path.resolve(__dirname, '../client/images')));
app.use('/fonts', express.static(path.resolve(__dirname, '../client/fonts')));

app.use(bodyParser.json());
app.use('/api', new Routes().routes);

let renderIndex = (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
};

app.get('/*', renderIndex);

let server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;
    journal.debug('Cette application Express écoute sur le port %d à l\'adresse %s', port, host);

    new Robots().miseAJour();
});
