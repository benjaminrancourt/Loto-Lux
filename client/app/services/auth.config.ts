export class AuthConfiguration {
  static ID_TOKEN: string = 'id_token';
  static UTILISATEUR: string = 'utilisateur';

  static ID_CLIENT: string = 'niBgi8oygCkSLOgYqGfjX0d7IVfj5Hxk';
  static DOMAINE: string = 'loto-lux.auth0.com';

  static OPTIONS: any = {
    auth: {
      redirect: false
    },
    autoclose: false,
    language: 'en',
    theme: {
      logo: 'images/ico/logo.png',
      primaryColor: '#b81b1c'
    },
    languageDictionary: {
      title: 'Loto-Lux'
    }
  };
};
