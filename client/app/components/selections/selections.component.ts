import { Component, Input} from '@angular/core';

import { Loterie, Tirage } from './../../models';

@Component({
  selector: 'selections',
  templateUrl: './app/components/selections/selections.component.html',
  styleUrls: ['./app/components/loterie/loterie.component.css']
})
//Représente une boîte contenant les sélections de l'utilisateur
export class SelectionsComponent {
  @Input() loterie: Loterie;
  @Input() tirage: Tirage;
}
