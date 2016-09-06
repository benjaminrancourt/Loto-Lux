export class Loterie {
  nom: string;
  url: string;
  avecComplementaire: boolean;
  avecSeparateur: boolean;
  couleur: string;
  dernierTirage: {
    date: string;
    principal: Array<string>;
    secondaire: Array<Array<string>>;
  };
}
