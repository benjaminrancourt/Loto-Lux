import * as moment from 'moment';

export interface IDate {
  date: moment.Moment;
  estEffectue: boolean;
}

export class JSONDate {
  date: string;
  estEffectue: boolean;
}

export class Date implements IDate {
  date: moment.Moment;
  estEffectue: boolean;

  constructor(date: moment.Moment, estEffectue: boolean) {
    this.date = date;
    this.estEffectue = estEffectue;
  }
}
