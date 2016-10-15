export class CourrielUtils {
  static POINT: string = '.'; //caractere non permis pour une clé Firebase
  static VIRGULE: string = ','; //non permis dans un adresse courriel

  //Encode le courriel en remplacant '.' par ','
  public static encoder(courriel: string): string {
    return courriel.toLowerCase().replace(/\./g, this.VIRGULE);
  }

  //Decode le courriel en remplacant ',' par '.'
  public static decoder(courriel: string): string {
    return courriel.toLowerCase().replace(/\,/g, this.POINT);
  }
}
