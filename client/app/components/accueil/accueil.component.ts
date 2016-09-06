import { Component } from 'angular2/core';

import {
  FonctionnalitesComponent,
  LoteriesComponent,
  PresentationComponent
} from './../';

@Component({
  selector: 'accueil',
  templateUrl: './app/components/accueil/accueil.component.html',
  directives: [
    FonctionnalitesComponent,
    LoteriesComponent,
    PresentationComponent
    ]
})

export class AccueilComponent {
}
