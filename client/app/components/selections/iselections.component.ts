import { Input, OnChanges, SimpleChanges } from '@angular/core';

import { AuthService, ISelectionOptions } from './../../services';
import { Loterie, Tirage } from './../../models';
import { Selection,
  ExtraSelection,
  Lotto649Selection,
  LottoMaxSelection,
  QuebecMaxSelection } from './../../selections';

//Représente une boîte contenant les sélections de l'utilisateur
export class ISelectionsComponent implements OnChanges {
  @Input() protected loterie: Loterie;
  @Input() protected tirage: Tirage;
  protected selection: Selection;

  constructor(protected authService: AuthService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loterie']) {
      this.changementLoterie();
    }
  }

  protected getOptions(): ISelectionOptions {
    return {
      loterie: this.loterie.url,
      date: this.tirage.date,
      utilisateur: this.authService.getCourriel(),
      token: this.authService.getToken()
    };
  }

 //Initialisation des sélections de la loterie
  protected changementLoterie(): void {
    switch (this.loterie.url) {
      case ExtraSelection.URL: this.selection = new ExtraSelection(); break;
      case Lotto649Selection.URL: this.selection = new Lotto649Selection(); break;
      case LottoMaxSelection.URL: this.selection = new LottoMaxSelection(); break;
      case QuebecMaxSelection.URL: this.selection = new QuebecMaxSelection(); break;
      default: this.selection = new ExtraSelection(); break;
    }
  }
}
