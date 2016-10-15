import { ExtraLoterie } from './extra.loterie';

describe('[Serveur] Classe « ExtraLoterie »', () => {
  let loterie: ExtraLoterie;

  beforeEach(() => {
    loterie = new ExtraLoterie();
  });

  it('son tableau de jours à ajouter est [1, 1, 1, 1, 1, 1, 1]', () => {
    expect(loterie.frequenceJours.length).toBe(7);
    expect(loterie.frequenceJours).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });
});
