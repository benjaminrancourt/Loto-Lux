import { LoterieService, TirageService } from './../services';
import { DateUtils } from './../../config/utils';

export class TirageBusiness {
  private loterieService: LoterieService;
  private tirageService: TirageService;

  constructor () {
    this.loterieService = new LoterieService();
    this.tirageService = new TirageService();
  }

  //Retourne tous les résultats des tirages d'une loterie
  //TODO : Si la loterie existe LoterieService
  recuperer(loterie: string, callback: (error: any, result: any) => void): void {
    this.tirageService.nomDonnees = loterie;
    this.tirageService.recuperer(callback);
  }

  //Retourne tous les résultats d'un tirage d'une loterie
  //TODO : Si la loterie existe LoterieService
  //TODO : Si la date existe DateService
  recupererParDate(loterie: string, date: string, callback: (error: any, result: any) => void): void {
    this.tirageService.nomDonnees = loterie;
    this.tirageService.recupererParDate(DateUtils.stringToMoment(date), callback);
  }

  //Retourne tous les résultats d'un tirage d'une loterie
  //TODO : Si la loterie existe LoterieService
  //TODO : Si la date existe DateService
  recupererDernierTirage(loterie: string, callback: (error: any, result: any) => void): void {
    this.loterieService.recupererDateDernierTirage(loterie, (erreur, date) => {
      if (!erreur) {
        this.tirageService.nomDonnees = loterie;
        this.tirageService.recupererParDate(DateUtils.stringToMoment(date), callback);
      } else {
        callback(erreur, null);
      }
    });
  }
}
