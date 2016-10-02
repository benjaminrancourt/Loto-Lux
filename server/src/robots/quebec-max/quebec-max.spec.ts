import { QuebecMax } from './quebec-max.loterie';

describe('[Serveur] Classe « QuebecMax »', () => {
  let loterie: QuebecMax;

  beforeEach(() => {
    loterie = new QuebecMax();
  });

  it('son tableau de jours à ajouter est [7]', () => {
    expect(loterie.frequenceJours.length).toBe(1);
    expect(loterie.frequenceJours).toEqual([7]);
  });
});
