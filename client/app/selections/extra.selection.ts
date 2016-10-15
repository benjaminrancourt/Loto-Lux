import { Selection, ISelectionOptions } from './';
import { Decomposable } from './../models';

export class ExtraSelection extends Selection {
  public static URL: string = 'extra';

  constructor() {
    let options: ISelectionOptions = {
      nbreNumeros: 7, minimum: 0, maximum: 9, regex: '[0-9]',
      trie: false, zeros: false
    };

    super(options);
  }

  protected calculerDecomposable(selection: string[], principal: string[]): Decomposable[] {
    let retour: Decomposable[] = [];
    let selectionGagnante: number[] = this.selectionGagnante(selection, principal);

    for (let i = 0; i < selection.length; ++i) {
      if (this.numeroGagnant(i, selectionGagnante)) {
        retour[i] = Decomposable.Gagnant;
      } else {
        retour[i] = Decomposable.Normal;
      }
    }

    return retour;
  }

  numeroGagnant(pos: number, tirage: number[]): boolean {
    //Gauche
    if (tirage[0] !== 0 && pos < tirage[0]) { return true; }

    //Droite
    if (tirage[1] !== 0 && pos >= 7 - tirage[1]) { return true; }

    return false;
  }

  selectionGagnante(selection: string[], tirage: string[]): number[] {
    let valide: boolean[] = selection.map((num, i) => num === tirage[i]);

    let droite: number = this.validerDroite(valide);
    let gauche: number = this.validerGauche(valide);

    return [gauche, droite];
  }

  validerDroite(selection: boolean[]): number {
    let num: number = 0;
    let index: number = 7 - 1;

    while (index >= 0 && selection[index]) {
      num++;
      index--;
    }

    return num;
  }

  validerGauche(selection: boolean[]): number {
    let num: number = 0;
    let index: number = 0;

    while (index < 7 && selection[index]) {
      num++;
      index++;
    }

    return num;
  }
}
