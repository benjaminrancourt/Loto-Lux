export interface ISelectionOptions {
  nbreNumeros: number;
  minimum: number;
  maximum: number;
  regex: string;

  numSelectionsMin?: number;
  trie?: boolean;
  zeros?: boolean;
  verifieDuplicat?: boolean;
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
    this.trie = options.trie ? options.trie : true;
    this.zeros = options.zeros ? options.zeros : true;
    this.verifieDuplicat = options.verifieDuplicat ? options.verifieDuplicat : false;
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

  //Trie les sélections
  private trier(selections: number[][]): number[][] {
    let resultats: number[][] = [];
    for (let i = 0; i < selections.length; ++i) {
      resultats[i] = selections[i].sort((a, b) => a - b);
    }

    return resultats;
  }
}
