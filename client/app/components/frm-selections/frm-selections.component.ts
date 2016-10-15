import { Component, Output, Input, EventEmitter } from '@angular/core';

import { AuthService, SelectionService } from './../../services';
import { ISelectionsComponent } from './..';
import { Loterie, Tirage } from './../../models';

@Component({
  selector: 'frm-selections',
  templateUrl: './app/components/frm-selections/frm-selections.component.html',
  styleUrls: ['./app/components/loterie/loterie.component.css',
    './app/components/frm-selections/frm-selections.component.css']
})
//Représente le formulaire permettant à l'utilisateur d'ajouter de nouvelles sélections
export class FrmSelectionsComponent extends ISelectionsComponent {
  @Input() protected loterie: Loterie;
  @Input() protected tirage: Tirage;

  @Output() private onAjoutSelection: EventEmitter<void>;
  private selections: number[][];

  constructor(
    private selectionService: SelectionService,
    protected authService: AuthService) {
      super(authService);
      this.onAjoutSelection = new EventEmitter<void>();
    }

  //Initialisation des sélections de la loterie
  protected changementLoterie(): void {
    super.changementLoterie();
    this.initialisationSelections();
  }

  //Permet de tracker correctement les numéros sur le formulaire
  protected trackByIdx(idx: number): number {
    return idx;
  }

  //Enregistre les sélections de l'utilisateur
  protected enregistrer(): void {
    this.selectionService.ajouter(this.getOptions(), this.selections, this.selection).then(() => {
      this.onAjoutSelection.emit();
      this.initialisationSelections();
    });
  }

  //Retourne vrai si le numéro à la position spécifiée est valide
  protected numeroValide(i: number, j: number): boolean {
    if (!this.selections[i][j]) { return false; }

    let numero: number = this.selections[i][j];
    let resultat: boolean = this.selection.numeroValide(numero);
    resultat = resultat && this.selection.numeroUnique(numero, this.selections[i]);

    return resultat;
  }

  //Retourne vrai si toutes les sélections sont valides
  protected selectionsValides(): boolean {
    for (let i = 0; i < this.selections.length; ++i) {
      if (!this.selection.selectionValide(this.selections[i])) {
        return false;
      }
    }

    return true;
  }

  //Ajoute une nouvelle sélection
  protected ajout(): void {
    this.selections.push(new Array(this.selection.nbreNumeros));
  }

  //Supprime la sélection sélectionnée
  protected suppression(i: number): void {
    this.selections.splice(i, 1);
  }

  private initialisationSelections(): void {
    this.selections = new Array(this.selection.numSelectionsMin);
    for (let i = 0; i < this.selections.length; ++i) {
      this.selections[i] = new Array(this.selection.nbreNumeros);
    }
  }
}
