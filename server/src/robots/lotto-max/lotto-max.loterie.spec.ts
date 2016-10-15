import { LottoMaxLoterie } from './lotto-max.loterie';

describe('[Serveur] Classe « LottoMaxLoterie »', () => {
  let loterie: LottoMaxLoterie;

  beforeEach(() => {
    loterie = new LottoMaxLoterie();
  });

  it('son tableau de jours à ajouter est [7]', () => {
    expect(loterie.frequenceJours.length).toBe(1);
    expect(loterie.frequenceJours).toEqual([7]);
  });
});
