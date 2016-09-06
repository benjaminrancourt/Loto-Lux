import {
  ExtraRobot,
  Lotto649Robot,
  LottoMaxRobot,
  QuebecMaxRobot,
  Robot } from './';
import { Journal } from './../config/utils';

//Classe regroupant les différents robots pour mettre à jour la base de données
export class Robots {
  private robots: Array<Robot>;
  private journal: Journal;

  constructor() {
    this.robots = [];
    this.journal = new Journal();

    this.robots.push(new ExtraRobot());
    this.robots.push(new Lotto649Robot());
    this.robots.push(new LottoMaxRobot());
    this.robots.push(new QuebecMaxRobot());
  }

  //Permet que chacun des robots mettent à jour la base de données
  public miseAJour(): void {
    this.journal.debug('Vérification si les données de chacun des robots sont bien à jours');

    for (let robot of this.robots) {
      robot.estIndexe((error, estIndexe) => {
        if (error) {
          this.journal.error('%s : Erreur lors de l\accès à la base de données : %s', robot, error);
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
