import * as cheerio from 'cheerio';
import * as moment from 'moment';

import firebase = require('firebase');
import rp = require('request-promise');
import http = require('http');

let httpAgent = new http.Agent();
httpAgent.maxSockets = 15;

import { Date, Loterie, IConstructor, Tirage } from './../app/model';
import { DateService, LoterieService, TirageService } from './../app/services';
import { DateUtils } from './../utils';

//Classe représentant un robot qui récupère les informations nécessaires sur le Web
export abstract class Robot<TLoterie extends Loterie> {
  private loterie: TLoterie;

  private AUJOURDHUI: moment.Moment;
  private PREMIER_TIRAGE: moment.Moment;
  private dernierTirage: moment.Moment;

  private loterieService: LoterieService;
  private tirageService: TirageService;
  private dateService: DateService;

  constructor(loterie: IConstructor<TLoterie>) {
    this.loterie = new loterie();

    this.tirageService = new TirageService(this.loterie.url);
    this.dateService = new DateService(this.loterie.url);
    this.loterieService = new LoterieService();

    this.AUJOURDHUI = moment();
    this.PREMIER_TIRAGE = DateUtils.stringToMoment(this.loterie.premierTirage.date);
    this.dernierTirage = DateUtils.stringToMoment(this.loterie.premierTirage.date);
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
    options.uri = options.uri + '&widget=resultats-anterieurs&noProduit=' + this.loterie.noProduit;

    //Création de la liste de promesses des pages Web à visiter
    let promesses: Promise<any>[] = [];

    while (annee < this.AUJOURDHUI.year()) {
      promesses.push(rp(options)
        .then(($) => this.getTiragesAnterieurs($))
      );

      options.uri = options.uri.replace(annee.toString(), (annee + 1).toString());
      annee++;
    }

    console.log('[' + this.loterie.nom + ']' + ' - ' + 'Importation de ' + promesses.length + ' année' + (promesses.length > 1 ? 's' : '') + ' de tirages.');

    return Promise.all(promesses);
  }

  //Méthode générale et spécifique retournant tous les résultats d'un tirage anterieurs
  protected getTirageAnterieurResultats($: CheerioStatic, element: CheerioElement): Cheerio {
    return $(element).find('td div').not('.titre');
  }

  //Méthode général traitant la sélection principale
  protected traitementSelectionPrincipale(selectionPrincipale: string[]): string[] {
    return selectionPrincipale;
  }

  //Calcul de l'indice de la journée de la semaine
  private calculIndiceJour(date: moment.Moment): number {
    let indexJour: number = 0;
    let numFrequence: number = this.loterie.frequence.length;

    while (date.day() !== this.loterie.frequence[indexJour] && indexJour < numFrequence) {
      indexJour++;
    }

    return indexJour;
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

    //Obtention de la date du prochain tirage et de son url
    let indexJour: number = this.calculIndiceJour(date);
    date.add(this.loterie.frequenceJours[indexJour], 'day');
    options.uri = 'https://loteries.lotoquebec.com/fr/loteries/' + this.loterie.url + '?date=' + DateUtils.momentToString(date);

    //Création de la liste de promesses des pages Web à visiter
    let promesses: Promise<any>[] = [];
    let datePrecedente: string;

    while (date < this.AUJOURDHUI) {
      promesses.push(rp(options)
        .then(($) => this.getTirageUlterieur($))
      );

      datePrecedente = DateUtils.momentToString(date);
      indexJour = (indexJour + 1) % this.loterie.frequence.length;
      date.add(this.loterie.frequenceJours[indexJour], 'day');
      options.uri = options.uri.replace(datePrecedente, DateUtils.momentToString(date));
    }

    console.log('[' + this.loterie.nom + ']' + ' - ' + 'Importation de ' + promesses.length + ' tirage' + (promesses.length > 1 ? 's' : '') + '.');

    return Promise.all(promesses);
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

      if (this.loterie.avecResultatsSecondaires) {
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

    if (this.loterie.avecResultatsSecondaires) {
      let resultatsSecondaires = resultats.slice(1);
      resultatsSecondaires.each((i, element) => {
        let selectionSecondaire = [];
        $(element).children('.num').each((i, element) => { selectionSecondaire.push($(element).text()); });
        resultat.ajouterResultatSecondaire(selectionSecondaire);
      });
    }

    return this.creerTirage(resultat);
  }
}
