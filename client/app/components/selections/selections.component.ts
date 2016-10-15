import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';

import { AuthService, SelectionService } from './../../services';
import { Decomposable, ISelection, Loterie, Tirage } from './../../models';

import { ISelectionsComponent } from './..';

@Component({
  selector: 'selections',
  templateUrl: './app/components/selections/selections.component.html',
  styleUrls: ['./app/components/selections/selections.component.css',
    './app/components/loterie/loterie.component.css']
})
//Représente une boîte contenant les sélections de l'utilisateur
export class SelectionsComponent extends ISelectionsComponent implements OnChanges {
  @Input() protected loterie: Loterie;
  @Input() protected tirage: Tirage;

  protected selections: ISelection[];
  private numGagnant: boolean[][];
  private numComplementaire: boolean[][];

  constructor(private selectionService: SelectionService,
    protected authService: AuthService) {
      super(authService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['tirage']) {
      this.recuperer();
    }
  }

  public recuperer(): void {
    this.selectionService.recuperer(this.getOptions())
      .then((selections) => {
        this.selections = selections;
        this.numGagnant = [];
        this.numComplementaire = [];

        this.calculerSelections();
    });
  }

  protected changementLoterie(): void {
    super.changementLoterie();
    this.recuperer();
  }

  protected suppression(position: number, selection: ISelection): void {
    this.selectionService.supprimer(this.getOptions(), selection.id)
      .then(() => {
        this.selections.splice(position, 1);
      });
  }

  private calculerSelections(): void {
    for (let i = 0; i < this.selections.length; ++i) {
      this.selections[i] = this.selection.calculer(this.selections[i], this.tirage.principal, this.tirage.secondaire);
      this.numGagnant[i] = [];
      this.numComplementaire[i] = [];

      for (let j = 0; j < this.selections[i].nombres.length; ++j) {
        this.numGagnant[i][j] = this.selections[i].decomposable[j] === Decomposable.Gagnant;
        this.numComplementaire[i][j] = this.selections[i].decomposable[j] === Decomposable.Complementaire;
      }
    }
  }
}
