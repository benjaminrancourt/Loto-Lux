import * as moment from 'moment';

export class DateUtils {
  static FORMAT_DATE: string = 'YYYY-MM-DD';
  static SEPARATEUR_DATE: string = '-';
  static SEPARATEUR_DATE_BDD: string = '/';

  static stringToStringArray(date: string): string[] {
    return date.split(this.SEPARATEUR_DATE);
  }

  static stringToMoment(date: string): moment.Moment {
    return moment(date, this.FORMAT_DATE);
  }

  static stringArrayToMoment(date: string[]): moment.Moment {
    return moment(date.join(this.SEPARATEUR_DATE), this.FORMAT_DATE);
  }

  static stringArrayToString(date: string[]): string {
    return date.join(this.SEPARATEUR_DATE);
  }

  static momentToString(date: moment.Moment): string {
    return date.format(this.FORMAT_DATE);
  }

  static momentToStringArray(date: moment.Moment): string[] {
    return this.momentToString(date).split(this.SEPARATEUR_DATE);
  }

  static momentToStringBD(date: moment.Moment): string {
    return this.replaceAll(this.momentToString(date), this.SEPARATEUR_DATE, this.SEPARATEUR_DATE_BDD);
  }

  private static replaceAll(texte: string, search: string, replace: string): string {
    return texte.split(search).join(replace);
  }
}
