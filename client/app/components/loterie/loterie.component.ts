import { Component, Input, OnInit} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Loterie, Tirage } from '../../models';
import { CalendrierComponent } from './..';

@Component({
  selector: 'loterie',
  templateUrl: './app/components/loterie/loterie.component.html',
  styleUrls: ['./app/components/loterie/loterie.component.css'],
  directives: [CalendrierComponent, ROUTER_DIRECTIVES]
})

//Représente une boîte contenant des informations sommaires sur la loterie
export class LoterieComponent implements OnInit {
  @Input() loterie: Loterie;
  @Input() tirage: Tirage;

  petitComposant: boolean;
  src: string;

  //Initialise la source du logo
  ngOnInit(): void {
    this.src = 'images/loteries/' + this.loterie.url + '.png';
    this.petitComposant = this.tirage === undefined;

    if (this.petitComposant) {
      this.tirage = this.loterie.dernierTirage;
    }
  }

  titre(): string {
    return this.petitComposant ? this.loterie.nom + ' - ' + this.tirage.date : 'Lot principal';
  }

  //Retourne vrai si le numéro à la i-ième position est un numéro complémentaire
  estComplementaire(i: number): boolean {
    return this.loterie.avecComplementaire && i === this.loterie.dernierTirage.principal.length - 1;
  }

  //Retourne vrai s'il faut ajouter un séparateur entre chaque numéro
  avecSeparateur(i: number): boolean {
    return this.loterie.avecSeparateur && i < this.loterie.dernierTirage.principal.length - 1;
  }
}
