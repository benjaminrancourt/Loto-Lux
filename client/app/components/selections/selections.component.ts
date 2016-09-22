import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { AuthService, ISelectionOptions, SelectionService } from './../../services';
import { ISelection, Loterie, Tirage } from './../../models';

@Component({
  selector: 'selections',
  templateUrl: './app/components/selections/selections.component.html',
  styleUrls: ['./app/components/loterie/loterie.component.css']
})
//Représente une boîte contenant les sélections de l'utilisateur
export class SelectionsComponent implements OnInit, OnChanges {
  @Input() loterie: Loterie;
  @Input() tirage: Tirage;

  selections: ISelection[];

  constructor(private selectionService: SelectionService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.recuperer();
  }

  recuperer(): void {
    let options: ISelectionOptions = {
      loterie: this.loterie.url,
      date: this.tirage.date,
      utilisateur: this.authService.getCourriel(),
      token: this.authService.getToken()
    };

    this.selectionService.recuperer(options)
      .then((selections) => this.selections = selections);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loterie'] || changes['tirage']) {
      this.recuperer();
    }
  }
}
