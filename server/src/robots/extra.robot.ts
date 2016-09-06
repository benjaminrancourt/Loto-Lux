import { Robot } from './';
import { Loterie } from './../app/model';

export class ExtraRobot extends Robot {
  constructor() {
    let loterie: Loterie = new Loterie('Extra', 'extra', false, false, '#678636');
    super(loterie, [0, 1, 2, 3, 4, 5, 6], 205, '1990-04-04', false);
  }

  //Méthode spécifique retournant tous les résultats d'un tirage antérieur
  protected getTirageAnterieurResultats($: CheerioStatic, element: CheerioElement): Cheerio {
    return $(element).find('td').slice(1);
  }

  //Méthode spécifique traitant la sélection principale
  protected traitementSelectionPrincipale(selectionPrincipale: string[]): string[] {
    return selectionPrincipale[0].split('');
  }
}
