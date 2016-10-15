import { QuebecMaxLoterie } from './quebec-max.loterie';

describe('[Serveur] Classe « QuebecMaxLoterie »', () => {
  let loterie: QuebecMaxLoterie;

  beforeEach(() => {
    loterie = new QuebecMaxLoterie();
  });

  it('son tableau de jours à ajouter est [7]', () => {
    expect(loterie.frequenceJours.length).toBe(1);
    expect(loterie.frequenceJours).toEqual([7]);
  });
});
