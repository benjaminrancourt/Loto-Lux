import { LoterieService } from './../services';

export class LoterieBusiness {
  private service: LoterieService;

  constructor () {
    this.service = new LoterieService();
  }

  //Retourne les informations de toutes les loteries
  recuperer(callback: (error: any, result: any) => void): void {
    this.service.recuperer(callback);
  }

  //Retourne les informations d'une loterie en particulier
  recupererParURL(loterie: string, callback: (error: any, result: any) => void): void {
    this.service.recupererParURL(loterie, callback);
  }
}
