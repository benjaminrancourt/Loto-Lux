import { Lotto649Loterie } from './lotto-6-49.loterie';

describe('[Serveur] Classe « Lotto649Loterie »', () => {
  let loterie: Lotto649Loterie;

  beforeEach(() => {
    loterie = new Lotto649Loterie();
  });

  it('son tableau de jours à ajouter est [3, 4]', () => {
    expect(loterie.frequenceJours.length).toBe(2);
    expect(loterie.frequenceJours).toEqual([3, 4]);
  });
});
