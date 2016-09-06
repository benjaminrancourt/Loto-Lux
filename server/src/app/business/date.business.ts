import { DateService, LoterieService } from './../services';
import { DateUtils } from './../../config/utils';

export class DateBusiness {
  private dateService: DateService;
  private loterieService: LoterieService;

  constructor () {
    this.dateService = new DateService();
    this.loterieService = new LoterieService();
  }

  //Retourne les dates d'une loterie selon l'année de son dernier tirage
  //TODO : Si la loterie existe LoterieService
  recuperer(loterie: string, callback: (error: any, result: any) => void): void {
    this.loterieService.recupererDateDernierTirage(loterie, (erreur, date) => {
      if (!erreur) {
        let arrayDate = DateUtils.stringToStringArray(date);
        this.dateService.nomDonnees = loterie;
        this.dateService.recupererParAnnee(arrayDate[0], callback);
      } else {
        callback(erreur, null);
      }
    });
  }

  //Retourne toutes les dates d'une loterie
  //TODO : Si la loterie existe LoterieService
  recupererTous(loterie: string, callback: (error: any, result: any) => void): void {
    this.dateService.nomDonnees = loterie;
    this.dateService.recuperer(callback);
  }

  //Retourne les dates d'une loterie selon son année
  //TODO : Si la loterie existe LoterieService
  recupererParAnnee(loterie: string, annee: string, callback: (error: any, result: any) => void): void {
    this.dateService.nomDonnees = loterie;
    this.dateService.recupererParAnnee(annee, callback);
  }
}
