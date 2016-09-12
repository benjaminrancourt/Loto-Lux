import * as async from 'async';
import * as cheerio from 'cheerio';
import * as moment from 'moment';
import * as request from 'request';

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

    this.calculerFrequenceJours();
  }

  public supprimer(): void {
    this.tirageService.supprimerToutes(null);
    this.dateService.supprimerToutes(null);
  }

  //Permet de déterminer si les résultats des tirages ont déjà été téléchargés
  public estIndexe(callback: (error: any, result: any) => void): void {
    this.loterieService.estIndexe(this.loterie.url, callback);
  }

  //Crée la loterie dans la base de données
   public creer(callback: (error: any) => void): void {
     this.loterieService.creer(this.loterie, callback);
   }

  //Méthode générale permettant de récuperer les résultats ultérieurs, récupérant la date du dernier tirage ajouté
  public importerTiragesUlterieurs(): void {
    this.loterieService.recupererDateDernierTirage(this.loterie.url, (erreur: any, date: string) => {
      if (erreur === null) {
        this.importerTiragesUlterieursA(DateUtils.stringToMoment(date));
      }
    });
  }

  //Méthode générale permettant d'importer les résultats des tirages antérieurs, c'est-à-dire depuis sa création
  public importerTiragesAnterieurs(callback: () => void): void {
    interface IResultatAnterieur {
      url: string;
      annee: number;
    }

    let resultat: IResultatAnterieur = {url: '', annee: this.PREMIER_TIRAGE.clone().year()};

    resultat.url = 'https://loteries.lotoquebec.com/fr/loteries/' + this.loterie.url + '?annee=' + resultat.annee;
    resultat.url = resultat.url + '&widget=resultats-anterieurs&noProduit=' + this.noProduit;

    //Création de la queue qui accumulera les pages Web à visiter
    let queue = async.queue((tirage: IResultatAnterieur, next) => {
      request(tirage.url, (error, response, body) => {
        if (response.statusCode === 200) {
          let $ = cheerio.load(body);
          this.getTiragesAnterieurs($, tirage.annee);
        }

        next();
      });
    });

    //À la fin de l'obtention des résultats antérieurs, appelera le callback spécifié
    queue.drain = callback;

    while (resultat.annee <= this.AUJOURDHUI.year()) {
      queue.push({url: resultat.url, annee: resultat.annee});
      resultat.url = resultat.url.replace(resultat.annee.toString(), (resultat.annee + 1).toString());
      resultat.annee++;
    }
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
  private importerTiragesUlterieursA(dernierTirageAjoute: moment.Moment): void {
    interface IResultatRecent {
      url: string;
      date: moment.Moment;
    }

    let resultat: IResultatRecent = {url: '', date: dernierTirageAjoute.clone()};

    let indexJour: number = 0;
    let numFrequence: number = this.frequence.length;
    while (dernierTirageAjoute.day() !== this.frequence[indexJour] && indexJour < numFrequence) {
      indexJour++;
    }

    if (indexJour === numFrequence) {
      return;
    }

    resultat.date.add(this.frequenceJours[indexJour], 'day');
    resultat.url = 'https://loteries.lotoquebec.com/fr/loteries/' + this.loterie.url + '?date=' + DateUtils.momentToString(resultat.date);
    indexJour = (indexJour + 1) % numFrequence;

    //Création de la queue qui accumulera les pages Web à visiter
    let queue = async.queue((tirage: IResultatRecent, next) => {
      request(tirage.url, (error, response, body) => {
        if (response.statusCode === 200) {
          let $ = cheerio.load(body);
          this.getTirageUlterieur($, DateUtils.momentToString(tirage.date));
        }

        next();
      });
    });

    let ancienneDate: moment.Moment;

    while (resultat.date <= this.AUJOURDHUI) {
      queue.push({url: resultat.url, date: resultat.date.clone()});

      ancienneDate = resultat.date.clone();
      resultat.date.add(this.frequenceJours[indexJour], 'day');
      resultat.url = resultat.url.replace(DateUtils.momentToString(ancienneDate), DateUtils.momentToString(resultat.date));

      indexJour = (indexJour + 1) % numFrequence;
    }
  }

  //Méthode spécifique permettant d'important les résultats des tirages antérieurs d'une année spécifique
  private getTiragesAnterieurs($: CheerioStatic, annee: number): void {
    if ($('.conteneur').length !== 1) {
      return;
    }

    //Exclure le titre de la page
    let tirages: CheerioElement[] = $('.conteneur table tr').slice(1).toArray().reverse();

    for (let element of tirages) {
      let date = $(element).children('td.date').text();
      let resultats = this.getTirageAnterieurResultats($, element);
      let resultatPrincipal = resultats.first();
      let selectionPrincipale = resultatPrincipal.children('span').map((i, element) => { return $(element).text(); }).get();
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
        this.creerTirage(resultat);
      }
    };
  }

  private creerTirage(tirage: Tirage): void {
    tirage.trierResultatsSecondaires();

    this.tirageService.creer(tirage, (erreur) => {
      if (!erreur) {
        this.loterieService.mettreAJourDernierTirage(this.loterie.url, tirage.toJSON(), null);

        let date: Date = new Date(tirage.date, true);
        this.dateService.creer(date, (erreur) => {
          if (erreur) {
            this.tirageService.supprimer(tirage, null);
          }
        });
      }
    });
  }

  //Méthode spécifique permettant d'important les résultats d'un tirage à une date donnée
  private getTirageUlterieur($: CheerioStatic, date: string): void {
    if ($('.lqZoneMessageNonDisponibilite').length === 1) {
      return;
    }

    let resultats = $('.lqZoneProduit.principal .lqZoneResultatsProduit .numeros');
    let resultatPrincipal = resultats.first();
    let selectionPrincipale = resultatPrincipal.children('.num').map((i, element) => { return $(element).text(); }).get();

    let resultat = new Tirage(date, selectionPrincipale);

    if (this.avecResultatsSecondaires) {
      let resultatsSecondaires = resultats.slice(1);
      resultatsSecondaires.each((i, element) => {
        let selectionSecondaire = [];
        $(element).children('.num').each((i, element) => { selectionSecondaire.push($(element).text()); });
        resultat.ajouterResultatSecondaire(selectionSecondaire);
      });
    }

    this.creerTirage(resultat);
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
