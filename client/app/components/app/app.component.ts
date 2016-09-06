import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { Loterie } from './../../models';
import { DateService, LoterieService, TirageService } from './../../services';

import {
  AccueilComponent,
  LoteriesComponent,
  LoterieDetailComponent,
  PiedDePageComponent
  } from './..';

@Component({
  selector: 'my-app',
  templateUrl: './app/components/app/app.component.html',
  styleUrls: ['./app/components/app/app.component.css'],
  directives: [
    ROUTER_DIRECTIVES,
    PiedDePageComponent
    ],
  providers: [
    ROUTER_PROVIDERS,
    DateService, LoterieService, TirageService
  ]
})

@RouteConfig([
  {
    path: '/accueil',
    name: 'Accueil',
    component: AccueilComponent,
    useAsDefault: true
  },
  {
    path: '/loteries',
    name: 'Loteries',
    component: LoteriesComponent
  },
  {
    path: '/loteries/:loterie',
    name: 'LoterieDetail',
    component: LoterieDetailComponent
  },
  {
    path: '/loteries/:loterie/:date',
    name: 'LoterieDetailDate',
    component: LoterieDetailComponent
  }
])

export class AppComponent {
  loteries: Loterie[];
  error: any;

  constructor(private service: LoterieService) { }

  //Recupère les loteries à l'initialisation
  ngOnInit(): void {
    this.getLoteries();
  }

  //Retourne les informations sommaires de toutes les loteries
  getLoteries(): void {
    this.service.recuperer()
      .then(loteries => {
        this.loteries = loteries;
      })
      .catch(error => this.error = error);
  }
}
