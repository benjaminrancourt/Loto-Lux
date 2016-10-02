import { LottoMax } from './lotto-max.loterie';

describe('[Serveur] Classe « LottoMax »', () => {
  let loterie: LottoMax;

  beforeEach(() => {
    loterie = new LottoMax();
  });

  it('son tableau de jours à ajouter est [7]', () => {
    expect(loterie.frequenceJours.length).toBe(1);
    expect(loterie.frequenceJours).toEqual([7]);
  });
});
