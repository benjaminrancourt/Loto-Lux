import { Robot } from './..';
import { ExtraLoterie } from './extra.loterie';

export class ExtraRobot extends Robot<ExtraLoterie> {
  constructor() { super(ExtraLoterie); }

  //Méthode spécifique retournant tous les résultats d'un tirage antérieur
  protected getTirageAnterieurResultats($: CheerioStatic, element: CheerioElement): Cheerio {
    return $(element).find('td').slice(1);
  }

  //Méthode spécifique traitant la sélection principale
  protected traitementSelectionPrincipale(selectionPrincipale: string[]): string[] {
    return selectionPrincipale[0].split('');
  }
}
