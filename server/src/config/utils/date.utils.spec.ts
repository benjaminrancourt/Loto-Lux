import * as moment from 'moment';

import { DateUtils } from './';

describe('La classe « DateUtils » fonctionne', () => {
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

  describe('si sa fonction « stringToStringBD » fonctionne', () => {
    it('si son résultat est correct', () => {
      let resultat: any = DateUtils.stringToStringBD(dateString);
      expect(resultat).toEqual(dateStringBD);
    });
  });

  describe('si sa fonction « stringToStringArray » fonctionne', () => {
    it('si son résultat est un array de trois string et qu\'il est correct', () => {
      let resultat: any = DateUtils.stringToStringArray(dateString);
      expect(resultat.length).toBe(3);
      expect(resultat).toEqual(dateArray);
    });
  });

  describe('si sa fonction « stringToMoment » fonctionne', () => {
    it('si son résultat est un moment et qu\'il est correct', () => {
      let resultat: any = DateUtils.stringToMoment(dateString);
      expect(resultat).toEqual(dateMoment);
    });
  });

  describe('si sa fonction « stringArrayToMoment » fonctionne', () => {
    it('si son résultat est un moment et qu\'il est correct', () => {
      let resultat: any = DateUtils.stringArrayToMoment(dateArray);
      expect(resultat).toEqual(dateMoment);
    });
  });

  describe('si sa fonction « stringArrayToString » fonctionne', () => {
    it('si son résultat est un string et qu\'il est correct', () => {
      let resultat: any = DateUtils.stringArrayToString(dateArray);
      expect(resultat).toEqual(dateString);
    });
  });

  describe('si sa fonction « stringArrayToString » fonctionne', () => {
    it('si son résultat est un string et qu\'il est correct', () => {
      let resultat: any = DateUtils.momentToString(dateMoment);
      expect(resultat).toEqual(dateString);
    });
  });

  describe('si sa fonction « momentToStringArray » fonctionne', () => {
    it('si son résultat est un array de string et qu\'il est correct', () => {
      let resultat: any = DateUtils.momentToStringArray(dateMoment);
      expect(resultat).toEqual(dateArray);
    });
  });

  describe('si sa fonction « momentToStringBD » fonctionne', () => {
    it('si son résultat est un string et qu\'il est correct', () => {
      let resultat: any = DateUtils.momentToStringBD(dateMoment);
      expect(resultat).toEqual(dateStringBD);
    });
  });
});
