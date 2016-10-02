export class Utilisateur {
  courriel: string;
  courrielVerifie: string;
  nom: string;
  token: string;

  constructor(token: string, profil: any) {
    this.courriel = profil.email;
    this.courrielVerifie = profil.email_verified;
    this.nom = profil.name;
    this.token = token;
  }
}
