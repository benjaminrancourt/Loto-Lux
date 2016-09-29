import * as cheerio from 'cheerio';
import * as moment from 'moment';

import firebase = require('firebase');
import rp = require('request-promise');
import http = require('http');

let httpAgent = new http.Agent();
httpAgent.maxSockets = 15;

import { Date, Loterie, Tirage } from './../app/model';
import { DateService, LoterieService, TirageService } from './../app/services';
import { DateUtils } from './../config/utils';

//Classe représentant un robot qui récupère les informations nécessaires sur le Web
export class Robot {
  private loterie: Loterie;

  private frequence: Array<number>;
  private frequenceJours: Array<number>;
  private noProduit: number;
  private avecResultatsSecondaires: boolean;

  private AUJOURDHUI: moment.Moment;
  private PREMIER_TIRAGE: moment.Moment;
  private dernierTirage: moment.Moment;

  private loterieService: LoterieService;
  private tirageService: TirageService;
  private dateService: DateService;

  constructor(loterie: Loterie, frequence: Array<number>, noProduit: number,
    premierTirage: string, avecResultatsSecondaires: boolean) {
    this.loterie = loterie;

    this.tirageService = new TirageService(loterie.url);
    this.dateService = new DateService(loterie.url);
    this.loterieService = new LoterieService();

    this.frequence = frequence;
    this.noProduit = noProduit;
    this.avecResultatsSecondaires = avecResultatsSecondaires;

    this.AUJOURDHUI = moment();
    this.PREMIER_TIRAGE = DateUtils.stringToMoment(premierTirage);
    this.dernierTirage = DateUtils.stringToMoment(premierTirage);

    this.calculerFrequenceJours();
  }

  public supprimer(): firebase.Promise<any> {
    return this.loterieService.supprimer(this.loterie)
      .then(() => this.dateService.supprimerToutes())
      .then(() => this.tirageService.supprimerToutes());
  }

  //Permet de déterminer si les résultats des tirages ont déjà été téléchargés
  public estIndexe(): firebase.Promise<any> {
    return this.loterieService.existe(this.loterie.url);
  }

  //Crée la loterie dans la base de données
   public creer(): firebase.Promise<any> {
     return this.loterieService.creer(this.loterie);
   }

  //Méthode générale permettant de récuperer les résultats ultérieurs, récupérant la date du dernier tirage ajouté
  public importerTiragesUlterieurs(): firebase.Promise<any> {
    return this.loterieService.recupererDateDernierTirage(this.loterie.url)
      .then((date: string) => {
        this.dernierTirage = DateUtils.stringToMoment(date);
        return this.importerTiragesUlterieursA();
      })
      .catch((erreur) => {
        console.log('%s : Erreur lors de l\'importation des résultats ultérieurs. %s', this.loterie.nom, erreur);
      });
  }

  //Méthode générale permettant d'importer les résultats des tirages antérieurs, c'est-à-dire depuis sa création
  public importerTiragesAnterieurs(): Promise<any> {
    let annee: number = this.PREMIER_TIRAGE.clone().year();
    let options = {
      timeout: 60000,
      uri: '',
      transform: (body) => cheerio.load(body)
    };

    options.uri = 'https://loteries.lotoquebec.com/fr/loteries/' + this.loterie.url + '?annee=' + annee;
    options.uri = options.uri + '&widget=resultats-anterieurs&noProduit=' + this.noProduit;

    //Création de la liste de promesses des pages Web à visiter
    //let promesses: Promise<any>[] = [];
    let urls: string[] = [];

    while (annee < this.AUJOURDHUI.year()) {
      /*promesses.push(rp(options)
        .then(($) => this.getTiragesAnterieurs($))
        .catch((erreur: any) => console.log('Antérieur ' + erreur))
      );*/

      urls.push(options.uri);
      options.uri = options.uri.replace(annee.toString(), (annee + 1).toString());
      annee++;
    }

    console.log('Antérieur ' + this.loterie.nom + ' = ' + urls.length);

    //return Promise.all(promesses);
    return Promise.all(urls.map((url: string) => {
      let opts = options;
      opts.uri = url;

      console.log('Antérieur ' + opts.uri);

      return rp(opts)
        .then(($) => this.getTiragesAnterieurs($))
        .catch((erreur: any) => console.log('Antérieur ' + erreur));
    }));
  }

  //Méthode générale et spécifique retournant tous les résultats d'un tirage anterieurs
  protected getTirageAnterieurResultats($: CheerioStatic, element: CheerioElement): Cheerio {
    return $(element).find('td div').not('.titre');
  }

  //Méthode général traitant la sélection principale
  protected traitementSelectionPrincipale(selectionPrincipale: string[]): string[] {
    return selectionPrincipale;
  }

  //Méthode générale permettant de récuperer les résultats ultérieurs à une date donnée
  private importerTiragesUlterieursA(): Promise<any> {
    let date: moment.Moment = this.dernierTirage.clone();
    let options = {
      pool: httpAgent,
      timeout: 60000,
      uri: '',
      transform: (body) => cheerio.load(body)
    };

    //Calcul de l'indice de la journée de la semaine
    let indexJour: number = 0;
    let numFrequence: number = this.frequence.length;
    while (date.day() !== this.frequence[indexJour] && indexJour < numFrequence) {
      indexJour++;
    }

    if (indexJour === this.frequence.length) {
      return;
    }

    //Obtention de la date du prochain tirage et de son url
    date.add(this.frequenceJours[indexJour], 'day');
    options.uri = 'https://loteries.lotoquebec.com/fr/loteries/' + this.loterie.url + '?date=' + DateUtils.momentToString(date);

    //Création de la liste de promesses des pages Web à visiter
    //let promesses: Promise<any>[] = [];
    let urls: string[] = [];
    let datePrecedente: string;

    while (date < this.AUJOURDHUI) {
      /*promesses.push(rp(options)
        .then(($) => this.getTirageUlterieur($))
        .catch((erreur: any) => console.log('Ultérieur ' + erreur))
      );*/
      urls.push(options.uri);

      datePrecedente = DateUtils.momentToString(date);
      indexJour = (indexJour + 1) % this.frequence.length;
      date.add(this.frequenceJours[indexJour], 'day');
      options.uri = options.uri.replace(datePrecedente, DateUtils.momentToString(date));
    }

    console.log('Ultérieur ' + this.loterie.nom + ' = ' + urls.length);

    //return Promise.all(promesses);
    return Promise.all(urls.map((url) => {
      let opts = options;
      opts.uri = url;

      console.log('Ultérieur ' + url);

      return rp(opts)
        .then(($) => this.getTirageUlterieur($))
        .catch((erreur: any) => console.log('Ultérieur ' + JSON.stringify(erreur)));
    }));
  }

  //Méthode spécifique permettant d'important les résultats des tirages antérieurs d'une année spécifique
  private getTiragesAnterieurs($: CheerioStatic): Promise<any> {
    if ($('.conteneur').length !== 1) {
      return;
    }

    //Exclure le titre de la page
    let tirages: CheerioElement[] = $('.conteneur table tr').slice(1).toArray().reverse();
    let promesses: firebase.Promise<any>[] = [];

    for (let element of tirages) {
      let date = $(element).children('td.date').text();
      let resultats = this.getTirageAnterieurResultats($, element);
      let resultatPrincipal = resultats.first();
      let selectionPrincipale = resultatPrincipal.children('span').map((i, element) => $(element).text()).get();
      selectionPrincipale = this.traitementSelectionPrincipale(selectionPrincipale);

      let resultat = new Tirage(date, selectionPrincipale);

      if (this.avecResultatsSecondaires) {
        let resultatsSecondaires = resultats.slice(1);
        resultatsSecondaires.each((i, element) => {
          let selectionSecondaire = [];
          $(element).children('span').each((i, element) => { selectionSecondaire.push($(element).text()); });
          resultat.ajouterResultatSecondaire(selectionSecondaire);
        });
      }

      if (date !== '') {
        promesses.push(this.creerTirage(resultat));
      }
    }

    return Promise.all(promesses);
  }

  private creerTirage(tirage: Tirage): firebase.Promise<any> {
    tirage.trierResultatsSecondaires();

    return this.tirageService.creer(tirage).then(() => {
      let date: Date = new Date(tirage.date, true);
      return this.dateService.creer(date)
        .then(() => {
          if (tirage.date >= this.dernierTirage) {
            this.dernierTirage = tirage.date.clone();
            return this.loterieService.mettreAJourDernierTirage(this.loterie.url, tirage.toJSON());
          }
        })
        .catch((erreur: any) => {
          console.log(erreur);
          this.tirageService.supprimer(tirage);
        });
      });
  }

  //Méthode spécifique permettant d'important les résultats d'un tirage à une date donnée
  private getTirageUlterieur($: CheerioStatic): firebase.Promise<any> {
    if ($('.lqZoneMessageNonDisponibilite').length === 1) {
      return;
    }

    let resultats = $('.lqZoneProduit.principal .lqZoneResultatsProduit .numeros');
    let resultatPrincipal = resultats.first();
    let selectionPrincipale = resultatPrincipal.children('.num').map((i, element) => { return $(element).text(); }).get();

    let date: string = $('#dateAffichee').text();
    let resultat = new Tirage(date, selectionPrincipale);

    if (this.avecResultatsSecondaires) {
      let resultatsSecondaires = resultats.slice(1);
      resultatsSecondaires.each((i, element) => {
        let selectionSecondaire = [];
        $(element).children('.num').each((i, element) => { selectionSecondaire.push($(element).text()); });
        resultat.ajouterResultatSecondaire(selectionSecondaire);
      });
    }

    return this.creerTirage(resultat);
  }

  //Méthode générale permettant de calculer le nombre de jours à ajouter à une date pour obtenir le prochain tirage
  private calculerFrequenceJours(): void {
      let numTirages: number = this.frequence.length;
      this.frequenceJours = [];

      for (let i = 0; i < numTirages; ++i) {
        if (i === (numTirages - 1)) {
          this.frequenceJours[i] = this.frequence[0] + 7 - this.frequence[i];
        } else {
          this.frequenceJours[i] = this.frequence[i + 1] - this.frequence[i];
        }
      }
  }
}
