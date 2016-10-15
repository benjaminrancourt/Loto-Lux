import { IJSONTirage } from './tirage.model';

export interface ILoterie {
  nom: string;
  url: string;

  avecComplementaire: boolean;
  avecSeparateur: boolean;
  couleur: string;

  premierTirage?: IJSONTirage;
  dernierTirage?: IJSONTirage;
}

export interface ILoterieOptions extends ILoterie {
  frequence: Array<number>;
  noProduit: number;
  avecResultatsSecondaires: boolean;
}

export interface IConstructor<TLoterie extends Loterie> {
  new(): TLoterie;
}

export class Loterie implements ILoterieOptions {
  nom: string;
  url: string;

  avecComplementaire: boolean;
  avecSeparateur: boolean;
  couleur: string;

  premierTirage: IJSONTirage;
  dernierTirage: IJSONTirage;

  frequence: Array<number>;
  noProduit: number;
  avecResultatsSecondaires: boolean;

  frequenceJours: Array<number>;

  constructor(options: ILoterieOptions) {
    this.nom = options.nom;
    this.url = options.url;

    this.avecComplementaire = options.avecComplementaire;
    this.avecSeparateur = options.avecSeparateur;
    this.couleur = options.couleur;

    this.premierTirage = options.premierTirage;
    this.dernierTirage = options.dernierTirage;

    this.frequence = options.frequence;
    this.noProduit = options.noProduit;
    this.avecResultatsSecondaires = options.avecResultatsSecondaires;

    this.calculerFrequenceJours();
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
