/// <reference path="../typings/index.d.ts" />
import express = require('express');
import serveStatic = require('serve-static');
import bodyParser = require('body-parser');
import path = require('path');
import replace = require('replace');
import compression = require('compression');

import { Routes } from './config/routes';
import { Robots } from './robots/robots';

let port: number = process.env.PORT || 3000;
let app = express();
let ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';

console.log('process.env.NODE_ENV = ' + '\'' + ENV + '\'');
replace({
  regex: 'process.env.NODE_ENV',
  replacement: '\'' + ENV + '\'',
  paths: ['./dist/client/app/main.js'],
  recursive: true,
  silent: true
});

app.use('/app', serveStatic(path.resolve(__dirname, '../client/app')));
app.use('/libs', serveStatic(path.resolve(__dirname, '../client/libs')));
app.use('/css', serveStatic(path.resolve(__dirname, '../client/css')));
app.use('/scripts', serveStatic(path.resolve(__dirname, '../client/scripts')));
app.use('/images', serveStatic(path.resolve(__dirname, '../client/images')));
app.use('/fonts', serveStatic(path.resolve(__dirname, '../client/fonts')));

app.use(compression());
app.use(bodyParser.json());
app.set('view cache', true);

app.use('/api', new Routes().routes);

let renderIndex = (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
};

app.get('/*', renderIndex);

let server = app.listen(port, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Cette application Express écoute sur le port %d à l\'adresse %s', port, host);

    let robots: Robots = new Robots();
    //robots.vider().then(() => robots.importer());
    robots.importer();
});
