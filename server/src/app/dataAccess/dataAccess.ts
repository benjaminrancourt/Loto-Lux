import firebase = require('firebase');
import { Constantes } from './../../config/constantes';

class DataAccess {
  static ref: firebase.database.Reference;

  static connect(): firebase.database.Reference {
    if (this.ref) {
      return this.ref;
    }

    firebase.initializeApp({
      databaseURL: Constantes.DATABASE_URL,
      serviceAccount: Constantes.SERVICE_ACCOUNT
    });

    this.ref = firebase.database().ref();

    return this.ref;
  }

  static database(name: string): firebase.database.Reference {
    return this.ref.child(name);
  }

  constructor () {
    DataAccess.connect();
  }
}

DataAccess.connect();
export default DataAccess;
