import { JSONTirage } from './tirage.model';

export interface ILoterie {
  url: string;
  nom: string;

  avecComplementaire: boolean;
  avecSeparateur: boolean;
  couleur: string;

  premierTirage: JSONTirage;
  dernierTirage: JSONTirage;
}

export class Loterie implements ILoterie {
  url: string;
  nom: string;

  avecComplementaire: boolean;
  avecSeparateur: boolean;
  couleur: string;

  premierTirage: JSONTirage;
  dernierTirage: JSONTirage;

  constructor(nom: string,
    url: string,
    avecComplementaire: boolean,
    avecSeparateur: boolean,
    couleur: string) {
    this.url = url;
    this.nom = nom;

    this.avecComplementaire = avecComplementaire;
    this.avecSeparateur = avecSeparateur;
    this.couleur = couleur;
  }
}
