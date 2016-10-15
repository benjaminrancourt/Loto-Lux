import { CourrielUtils } from './';

describe('[Serveur] Classe « CourrielUtils »', () => {
  let courrielDecode: string;
  let courrielEncode: string;

  beforeEach(() => {
    courrielDecode = 'courriel.test@arobase.qc.ca';
    courrielEncode = 'courriel,test@arobase,qc,ca';
  });

  describe('Fonction « encoder »', () => {
    it('retourne le courriel sans aucun point', () => {
      let resultat: string = CourrielUtils.encoder(courrielDecode);
      expect(resultat).toEqual(courrielEncode);
    });

    it('retourne le même courriel après l\'avoir encodé puis décodé', () => {
      let resultat: string = CourrielUtils.encoder(courrielDecode);
      resultat = CourrielUtils.decoder(resultat);
      expect(resultat).toEqual(courrielDecode);
    });
  });

  describe('Fonction « decoder »', () => {
    it('retourne le courriel sans aucune virgule', () => {
      let resultat: string = CourrielUtils.decoder(courrielEncode);
      expect(resultat).toEqual(courrielDecode);
    });

    it('retourne le même courriel après l\'avoir décodé puis encodé', () => {
      let resultat: string = CourrielUtils.decoder(courrielEncode);
      resultat = CourrielUtils.encoder(resultat);
      expect(resultat).toEqual(courrielEncode);
    });
  });
});
