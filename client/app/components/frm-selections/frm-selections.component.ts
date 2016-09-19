import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
export class FrmSelectionsComponent implements OnChanges, OnInit {
  @Input() loterie: Loterie;
  @Input() tirage: Tirage;

  formulaire: FormGroup;

  selections: number[][];
  selection: Selection;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    if (!this.selection) { return; }

    let inputs: {[key: string]: any;} = {};

    for (let i: number = 0; i < this.selections.length; ++i) {
      for (let j: number = 0; j < this.selection.nbreNumeros; ++j) {
        let cle: string = this.loterie.url + '_' + i + '_' + j;
        inputs[cle] = [this.selections[i][j],
          [
            Validators.required,
            Validators.pattern(this.selection.regex),
            Validators.minLength(this.selection.minimum.toString().length),
            Validators.maxLength(this.selection.maximum.toString().length)
          ]
        ];
      }
    }

    this.formulaire = this.fb.group(inputs);
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
    console.log('Submit');
    //this.changementLoterie();
  }

  //Retourne vrai si le numéro à la position spécifiée est valide
  numeroValide(i: number, j: number): boolean {
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
    this.buildForm();
  }

  //Supprime la sélection sélectionnée
  suppression(i: number): void {
    this.selections.splice(i, 1);
    this.buildForm();
  }
}
