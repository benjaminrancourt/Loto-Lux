export enum Decomposable {
  Normal = 0,
  Gagnant,
  Complementaire
}

export interface ISelection {
  id: string;
  nombres: string[];

  lots: string[];
  decomposable: Decomposable[];
  gagnantSecondaire: number;
}
