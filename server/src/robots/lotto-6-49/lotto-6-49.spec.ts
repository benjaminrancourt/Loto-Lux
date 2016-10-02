import { Lotto649 } from './lotto-6-49.loterie';

describe('[Serveur] Classe « Lotto649 »', () => {
  let loterie: Lotto649;

  beforeEach(() => {
    loterie = new Lotto649();
  });

  it('son tableau de jours à ajouter est [3, 4]', () => {
    expect(loterie.frequenceJours.length).toBe(2);
    expect(loterie.frequenceJours).toEqual([3, 4]);
  });
});
