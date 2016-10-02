import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges } from '@angular/core';

import { AuthService, ISelectionOptions, SelectionService } from './../../services';
import { Loterie, Tirage } from './../../models';
import { Selection,
  ExtraSelection,
  Lotto649Selection,
  LottoMaxSelection,
  QuebecMaxSelection } from './../../selections';

@Component({
  selector: 'frm-selections',
  templateUrl: './app/components/frm-selections/frm-selections.component.html',
  styleUrls: ['./app/components/loterie/loterie.component.css',
    './app/components/frm-selections/frm-selections.component.css']
})
//Représente le formulaire permettant à l'utilisateur d'ajouter de nouvelles sélections
export class FrmSelectionsComponent implements OnChanges {
  @Input() loterie: Loterie;
  @Input() tirage: Tirage;
  @Output() onAjoutSelection: EventEmitter<void>;

  selections: number[][];
  selection: Selection;

  constructor(
    private selectionService: SelectionService,
    private authService: AuthService) {
      this.onAjoutSelection = new EventEmitter<void>();
    }

  //Initialisation des sélections de la loterie
  changementLoterie(): void {
    switch (this.loterie.url) {
      case ExtraSelection.URL: this.selection = new ExtraSelection(); break;
      case Lotto649Selection.URL: this.selection = new Lotto649Selection(); break;
      case LottoMaxSelection.URL: this.selection = new LottoMaxSelection(); break;
      case QuebecMaxSelection.URL: this.selection = new QuebecMaxSelection(); break;
      default: this.selection = new ExtraSelection(); break;
    }

    this.selections = new Array(this.selection.numSelectionsMin);
    for (let i = 0; i < this.selections.length; ++i) {
      this.selections[i] = new Array(this.selection.nbreNumeros);
    }
  }

  //S'assure que le composant change de loterie s'il y a lieu
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loterie'] && changes['loterie'].previousValue !== changes['loterie'].currentValue) {
      this.changementLoterie();
    }
  }

  //Permet de tracker correctement les numéros sur le formulaire
  trackByIdx(idx: number): number {
    return idx;
  }

  //Enregistre les sélections de l'utilisateur
  enregistrer(): void {
    let options: ISelectionOptions = {
      loterie: this.loterie.url,
      date: this.tirage.date,
      utilisateur: this.authService.getCourriel(),
      token: this.authService.getToken()
    };

    this.selectionService.ajouter(options, this.selections, this.selection).then(() => {
      this.onAjoutSelection.emit();
      this.changementLoterie();
    });
  }

  //Retourne vrai si le numéro à la position spécifiée est valide
  numeroValide(i: number, j: number): boolean {
    if (!this.selections[i][j]) { return false; }

    let numero: number = this.selections[i][j];
    let resultat: boolean = this.selection.numeroValide(numero);
    resultat = resultat && this.selection.numeroUnique(numero, this.selections[i]);

    return resultat;
  }

  //Retourne vrai si toutes les sélections sont valides
  selectionsValides(): boolean {
    for (let i = 0; i < this.selections.length; ++i) {
      if (!this.selection.selectionValide(this.selections[i])) {
        return false;
      }
    }

    return true;
  }

  //Ajoute une nouvelle sélection
  ajout(): void {
    this.selections.push(new Array(this.selection.nbreNumeros));
  }

  //Supprime la sélection sélectionnée
  suppression(i: number): void {
    this.selections.splice(i, 1);
  }
}
