import { Extra } from './extra.loterie';

describe('[Serveur] Classe « Extra »', () => {
  let loterie: Extra;

  beforeEach(() => {
    loterie = new Extra();
  });

  it('son tableau de jours à ajouter est [1, 1, 1, 1, 1, 1, 1]', () => {
    expect(loterie.frequenceJours.length).toBe(7);
    expect(loterie.frequenceJours).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });
});
