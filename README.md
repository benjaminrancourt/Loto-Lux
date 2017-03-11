# Loto-Lux
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/ranb2002/loto-lux)
[![Build Status](https://travis-ci.org/ranb2002/Loto-Lux.svg?branch=master)](https://travis-ci.org/ranb2002/Loto-Lux)
[![Dependency Status](https://david-dm.org/ranb2002/loto-lux.svg)](https://david-dm.org/ranb2002/loto-lux)
[![devDependency Status](https://david-dm.org/ranb2002/loto-lux/dev-status.svg)](https://david-dm.org/ranb2002/loto-lux#info=devDependencies)

Loto-Lux est une application Web de loteries canadiennes, dont l'Extra, Lotto 6/49, Lotto-Max et Québec Max. Cette application a été créé dans le but d'essayer Angular 2 avec TypeScript. Je prévois ajouter de nouvelles fonctionnalités au fur et à mesure que je développe mes connaissances avec ces nouvelles technologies.

## Logiciels et technologies
### Commun
* [Dillinger] : Éditeur en ligne permettant de visualiser un document formaté selon Markdown
* [Git] : Logiciel de gestion de versions décentralisé
* [GitHub] : Service web d'hébergement et de gestion de développement de logiciels
* [Gulp] : Outil pour automatiser certaines tâches pour le développement
* [Heroku] : Service d'infonuagique pour héberger divers types d'applications Web
* [NetBeans IDE] : Environnement de développement
* [Node.js] : Plateforme logicielle en JavaScript
* [Notepad++] : Éditeur de texte avancé
* [npm] : Gestionnaire de paquets de Node.js
* [TypeScript] : Langage de programmation multi-paradigme et sur-ensemble de JavaScript

### Client
  * [Angular 2] : Plateforme de développement d'applications mobiles et Web
  * [CSS3] : Troisième niveau des feuilles de styles en cascade
  * [HTML5] : Dernière révision majeure du HTML
  * [jQuery] : Bibliothèque JavaScript

### Serveur
  * [Cheerio] : Implémantation du noyau de jQuery développé spécialement pour les serveurs
  * [Express] : Plateforme de développement d'applications Web en Node.js
  * [Firebase] : Plateforme d'infonuagique offrant divers services, dont une base de données en format JSON
  * [Moment.js] : Librairie JavaScript pour analyser, valider, manipuler et formatter les dates
  * [PM2] : Gestionnaire de processus pour les applications Node.js

### Tests
  * [Karma] : Outil pour exécuter du code JavaScript des des vrais navigateurs
  * [Jasmine] : Outil pour développer et exécuter des tests Jasmine
  * [remap-istanbul] : Outil pour remapper le résultat de la couverture des tests sur le code source TypeScript
  * [Travis CI] : Service Web pour compiler, test et déployer du code source

## Prérequis
1. Avoir la dernière version de Node.js (```node --version``` : v6.5.0)
2. Avoir la dernière version de npm (```npm --version``` : 3.10.5)
3. Posséder un compte sur [Firebase]
4. Posséder un compte sur [GitHub]
5. Posséder un compte sur [Travis CI]
6. Posséder un compte sur [Heroku]

## Installation et utilisation
### Code source
```bash
git clone https://github.com/ranb2002/Loto-Lux.git
cd Loto-Lux
npm install
npm run build-start
```

## Intégration continue
| GitHub                 | Travis CI                   | Heroku                 |
|:----------------------:|:---------------------------:|:----------------------:|
| ![GitHub][ImageGitHub] | ![Travis CI][ImageTravisCI] | ![Heroku][ImageHeroku] |
| Le code est envoyé sur GitHub et ce dernier signale à Travis CI la réception du code | Travis CI vérifie si les tests passent et déploit l'application sur Heroku le cas échéant | Une nouvelle version de l'application est maintenant en production |

[ImageGitHub]: <http://www.datanucleus.org/images/GitHub-Mark-64px.png>
[ImageTravisCI]: <https://avatars.githubusercontent.com/u/639823?v=3&s=64>
[ImageHeroku]: <https://avatars.githubusercontent.com/u/23211?v=3&s=64>

## Remerciements
Je tiens à souligner la contribution d'autres projets qui m'ont servi à titre d'exemples et de guides, notamment :
- [todo-angular2-firebase](https://github.com/r-park/todo-angular2-firebase) de [r-park](https://github.com/r-park)
- [auth0-angularjs2-systemjs-sample](https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample) de [Auth0](https://github.com/auth0-samples)
- [Angular2-express-mongoose-gulp-node-typescript](https://github.com/moizKachwala/Angular2-express-mongoose-gulp-node-typescript) de [moizKachwala](https://github.com/moizKachwala)

## Licence
MIT

[Angular 2]: <https://angular.io/>
[Cheerio]: <https://cheerio.js.org/>
[Dillinger]: <http://dillinger.io/>
[Express]: <http://expressjs.com/>
[Firebase]: <https://firebase.google.com/>
[GitHub]: <https://github.com/>
[Git]: <https://git-scm.com/>
[Gulp]: <http://gulpjs.com/>
[Heroku]: <https://www.heroku.com/>
[heroku-buildpack-nodejs-gulp]: <https://github.com/appstack/heroku-buildpack-nodejs-gulp>
[HTML5]: <https://developer.mozilla.org/fr/docs/Web/Guide/HTML/HTML5>
[Karma]: <http://karma-runner.github.io/>
[Jasmine]: <https://jasmine.github.io/>
[jQuery]: <https://jquery.com/>
[Moment.js]: <http://momentjs.com/>
[NetBeans IDE]: <https://netbeans.org/>
[Node.js]: <https://nodejs.org/en/>
[Notepad++]: <https://notepad-plus-plus.org/>
[npm]: <https://www.npmjs.com/>
[PM2]: <http://pm2.keymetrics.io/>
[remap-istanbul]: <https://github.com/SitePen/remap-istanbul>
[Travis CI]: <https://travis-ci.org/>
[TypeScript]: <https://www.typescriptlang.org/>