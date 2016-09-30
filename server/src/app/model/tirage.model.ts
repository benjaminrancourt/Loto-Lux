import * as moment from 'moment';
import { DateUtils } from './../../config/utils';

export interface ITirage {
  date: moment.Moment;
  principal: Array<string>;
  secondaire?: Array<Array<string>>;
}

export class JSONTirage {
  date: string;
  principal?: Array<string>;
  secondaire?: Array<Array<string>>;
}

export class Tirage implements ITirage {
  date: moment.Moment;
  principal: Array<string>;
  secondaire: Array<Array<string>>;

  constructor(date: string, principal: Array<string>) {
    this.date = DateUtils.stringToMoment(date);
    this.principal = principal;
    this.secondaire = new Array<Array<string>>();
  }

  ajouterResultatSecondaire(secondaire: Array<string>): void {
    this.secondaire.push(secondaire);
  }

  trierResultatsSecondaires(): void {
    if (this.secondaire && this.secondaire.length > 0) {
      this.secondaire.sort();
    }
  }

  toJSON(): JSONTirage {
    let tirage: JSONTirage = {
      date: DateUtils.momentToString(this.date),
      principal: this.principal,
      secondaire: this.secondaire
    };

    return tirage;
  }
}
