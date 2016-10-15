import { ISelection, Decomposable } from './../models';

export interface ISelectionOptions {
  nbreNumeros: number;
  minimum: number;
  maximum: number;
  regex: string;

  numSelectionsMin?: number;
  trie: boolean;
  zeros: boolean;
  verifieDuplicat: boolean;
}

export class Selection {
  public nbreNumeros: number;
  public minimum: number;
  public maximum: number;
  public regex: string;

  public numSelectionsMin: number;
  public trie: boolean;
  public zeros: boolean;
  protected verifieDuplicat: boolean;

  constructor(options: ISelectionOptions) {
    this.nbreNumeros = options.nbreNumeros;
    this.minimum = options.minimum;
    this.maximum = options.maximum;
    this.regex = options.regex;

    this.numSelectionsMin = options.numSelectionsMin ? options.numSelectionsMin : 1;
    this.trie = options.trie;
    this.zeros = options.zeros;
    this.verifieDuplicat = options.verifieDuplicat;
  }

  //Retourne vrai si le numéro est entre le minimum et le maximum inclusivement
  numeroValide(numero: number): boolean {
    if (!numero) { return false; }
    return numero >= this.minimum && numero <= this.maximum;
  }

  numeroUnique(numero: number, numeros: number[]): boolean {
    if (!this.verifieDuplicat) { return true; }

    let nombre: number = 0;
    for (let i = 0; i < numeros.length; ++i) {
      nombre += (numeros[i] === numero) ? 1 : 0;
    }

    return nombre === 1;
  }

  //Retourne vrai si la sélection est valide
  selectionValide(numeros: number[]): boolean {
    let numerosValide: boolean = numeros.filter(this.numeroValide, this).length === this.nbreNumeros;
    let aucunDuplicat: boolean = true;

    if (this.verifieDuplicat) {
      aucunDuplicat = (new Set(numeros)).size === numeros.length;
    }

    return numerosValide && aucunDuplicat;
  }

  public formatString(selections: number[][]): string[][] {
    let selectionString: string[][] = [];

    if (this.trie) { selections = this.trier(selections); }

    for (let i = 0; i < selections.length; ++i) {
      selectionString[i] = selections[i].map((nombre) => {
        if (this.zeros && nombre >= 0 && nombre <= 9) {
          return '0' + nombre.toString();
        } else {
          return nombre.toString();
        }
      });
    }

    return selectionString;
  }

  public calculer(selection: ISelection, principal: string[], secondaires: string[][]): ISelection {
    selection.decomposable = this.calculerDecomposable(selection.nombres, principal);
    selection.gagnantSecondaire = this.calculerSecondaire(selection.nombres, secondaires);

    return selection;
  }

  protected calculerDecomposable(selection: string[], principal: string[]): Decomposable[] {
    let retour: Decomposable[] = [];

    for (let i = 0; i < selection.length; ++i) {
      let index: number = principal.indexOf(selection[i]);
      if (index !== -1) {
        retour[i] = (index !== principal.length - 1) ? Decomposable.Gagnant : Decomposable.Complementaire;
      } else {
        retour[i] = Decomposable.Normal;
      }
    }

    return retour;
  }

  private calculerSecondaire(selection: string[], secondaires: string[][]): number {
    let estIdentique: boolean;

    if (!secondaires) { return -1; }

    for (let i = 0; i < secondaires.length; ++i) {
      estIdentique = (selection.length === secondaires[i].length) && selection.every((element, index) => {
        return element === secondaires[i][index];
      });

      if (estIdentique) { return i; }
    }

    return -1;
  }

  //Trie les sélections
  private trier(selections: number[][]): number[][] {
    let resultats: number[][] = [];
    for (let i = 0; i < selections.length; ++i) {
      resultats[i] = selections[i].sort((a, b) => a - b);
    }

    return resultats;
  }
}
