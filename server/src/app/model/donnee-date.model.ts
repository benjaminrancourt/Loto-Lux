import * as moment from 'moment';

export interface IDonneeDate {
  date: moment.Moment;
}

export class JSONDonneeDate {
  date: string;
}
