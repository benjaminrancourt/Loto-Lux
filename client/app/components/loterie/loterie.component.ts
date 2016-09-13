import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import { Loterie, Tirage } from '../../models';

@Component({
  selector: 'loterie',
  templateUrl: './app/components/loterie/loterie.component.html',
  styleUrls: ['./app/components/loterie/loterie.component.css']
})

//Représente une boîte contenant des informations sommaires sur la loterie
export class LoterieComponent implements OnInit, OnChanges {
  @Input() loterie: Loterie;
  @Input() tirage: Tirage;

  petitComposant: boolean;
  src: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loterie'] && changes['loterie'].previousValue !== changes['loterie'].currentValue) {
      this.src = 'images/loteries/' + this.loterie.url + '.png';
    }
  }

  //Initialise la source du logo
  ngOnInit(): void {
    this.petitComposant = this.tirage === undefined;

    if (this.petitComposant) {
      this.tirage = this.loterie.dernierTirage;
    }
  }

  titre(): string {
    return this.petitComposant ? this.loterie.nom + ' — ' + this.tirage.date : 'Lot principal';
  }

  //Retourne vrai si le numéro à la i-ième position est un numéro complémentaire
  estComplementaire(i: number): boolean {
    return this.loterie.avecComplementaire && i === this.loterie.dernierTirage.principal.length - 1;
  }

  //Retourne vrai s'il faut ajouter un séparateur entre chaque numéro
  avecSeparateur(i: number): boolean {
    return this.loterie.avecSeparateur && i < this.loterie.dernierTirage.principal.length - 1;
  }

  //Retourne vrai s'il y a des résultats secondaires à afficher
  afficherResultatsSecondaires(): boolean {
    return !this.petitComposant && this.tirage.secondaire && this.tirage.secondaire.length > 0;
  }
}
