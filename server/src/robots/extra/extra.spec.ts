import { Extra } from './extra.loterie';

describe('La classe « Extra » est correct', () => {
  let loterie: Extra;

  beforeEach(() => {
    loterie = new Extra();
  });

  it('si son tableau de jours à ajouter est correct', () => {
    expect(loterie.frequenceJours.length).toBe(7);
    expect(loterie.frequenceJours).toEqual([1, 1, 1, 1, 1, 1, 1]);
  });
});
