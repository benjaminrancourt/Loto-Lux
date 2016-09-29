import {
  ExtraRobot,
  Lotto649Robot,
  LottoMaxRobot,
  QuebecMaxRobot,
  Robot } from './';

//Classe regroupant les différents robots pour mettre à jour la base de données
export class Robots {
  private robots: Array<Robot>;

  constructor() {
    this.robots = [];

    this.robots.push(new ExtraRobot());
    this.robots.push(new Lotto649Robot());
    this.robots.push(new LottoMaxRobot());
    this.robots.push(new QuebecMaxRobot());
  }

  //Permet de vider le contenu reliés aux robots de la base des données
  public vider(): Promise<any> {
    let promesses: any[] = [];
    for (let robot of this.robots) {
      promesses.push(robot.supprimer());
    }

    return Promise.all(promesses);
  }

  //Permet l'importation des données de tous les robots
  public importer(): void {
    for (let robot of this.robots) {
      robot.estIndexe().then((estIndexe: boolean) => {
        if (!estIndexe) {
          robot.creer()
            .then(() => robot.importerTiragesAnterieurs())
            .then(() => robot.importerTiragesUlterieurs());
        } else {
          robot.importerTiragesUlterieurs();
        }
      });
    }
  }
}
