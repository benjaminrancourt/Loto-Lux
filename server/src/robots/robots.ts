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

  //Permet que chacun des robots mettent à jour la base de données
  public miseAJour(): void {
    for (let robot of this.robots) {
      robot.estIndexe((error, estIndexe) => {
        if (error) {
          return;
        }
        else if (!estIndexe) {
          robot.creer(() => {
            robot.importerTiragesAnterieurs(() => {
              robot.importerTiragesUlterieurs();
            });
          });
        } else {
          robot.importerTiragesUlterieurs();
        }
      });
    }
  }
}
