import * as moment from 'moment';

import { DateUtils } from './';

describe('[Serveur] Classe « DateUtils »', () => {
  let dateString: string;
  let dateArray: string[];
  let dateMoment: moment.Moment;
  let dateStringBD: string;

  beforeEach(() => {
    dateString = '2016-09-11';
    dateArray = dateString.split('-');
    dateStringBD = dateString.split('-').join('/');
    dateMoment = moment(dateString, 'YYYY-MM-DD');
  });

  describe('Fonction « stringToStringBD »', () => {
    it('retourne la date du format YYYY-MM-DD vers le format YYYY/MM/DD', () => {
      let resultat: string = DateUtils.stringToStringBD(dateString);
      expect(resultat).toEqual(dateStringBD);
    });
  });

  describe('Fonction « stringToStringArray »', () => {
    it('retourne la date du format YYYY-MM-DD vers le format [YYYY, MM, DD]', () => {
      let resultat: any = DateUtils.stringToStringArray(dateString);
      expect(resultat).toEqual(dateArray);
    });
  });

  describe('Fonction « stringToMoment »', () => {
    it('retourne la date du format YYYY-MM-DD vers le format Moment', () => {
      let resultat: moment.Moment = DateUtils.stringToMoment(dateString);
      expect(resultat).toEqual(dateMoment);
    });
  });

  describe('Fonction « stringArrayToMoment »', () => {
    it('retourne la date du format [YYYY, MM, DD] vers le format Moment', () => {
      let resultat: moment.Moment = DateUtils.stringArrayToMoment(dateArray);
      expect(resultat).toEqual(dateMoment);
    });
  });

  describe('Fonction « stringArrayToString »', () => {
    it('retourne la date du format [YYYY, MM, DD] vers le format YYYY-MM-DD', () => {
      let resultat: string = DateUtils.stringArrayToString(dateArray);
      expect(resultat).toEqual(dateString);
    });
  });

  describe('Fonction « momentToString »', () => {
    it('retourne la date du format Moment vers le format YYYY-MM-DD', () => {
      let resultat: string = DateUtils.momentToString(dateMoment);
      expect(resultat).toEqual(dateString);
    });
  });

  describe('Fonction « momentToStringArray »', () => {
    it('retourne la date du format Moment vers le format [YYYY, MM, DD]', () => {
      let resultat: string[] = DateUtils.momentToStringArray(dateMoment);
      expect(resultat).toEqual(dateArray);
    });
  });

  describe('Fonction « momentToStringBD »', () => {
    it('retourne la date du format Moment vers le format YYYY/MM/DD', () => {
      let resultat: string = DateUtils.momentToStringBD(dateMoment);
      expect(resultat).toEqual(dateStringBD);
    });
  });
});
