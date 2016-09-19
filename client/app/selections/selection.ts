export interface ISelectionOptions {
  nbreNumeros: number;
  minimum: number;
  maximum: number;
  regex: string;

  numSelectionsMin?: number;
  verifieDuplicat?: boolean;
}

export class Selection {
  public nbreNumeros: number;
  public minimum: number;
  public maximum: number;
  public regex: string;

  public numSelectionsMin: number;
  protected verifieDuplicat: boolean;

  constructor(options: ISelectionOptions) {
    this.nbreNumeros = options.nbreNumeros;
    this.minimum = options.minimum;
    this.maximum = options.maximum;
    this.regex = options.regex;

    this.numSelectionsMin = options.numSelectionsMin ? options.numSelectionsMin : 1;
    this.verifieDuplicat = options.verifieDuplicat ? options.verifieDuplicat : false;
  }

  //Retourne vrai si le numéro est entre le minimum et le maximum inclusivement
  numeroValide(numero: number): boolean {
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
    let numerosValide: boolean = numeros.every(this.numeroValide, this);
    let aucunDuplicat: boolean = true;

    if (this.verifieDuplicat) {
      aucunDuplicat = (new Set(numeros)).size === numeros.length;
    }

    return numerosValide && aucunDuplicat;
  }
}
