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

  selectionVide: number[];
  selection: Selection;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    if (!this.selection) { return; }

    let inputs: {[key: string]: any;} = {};

    for (let i: number = 0; i < this.selection.nbreNumeros; ++i) {
      let cle: string = 'num_' + i;
      inputs[cle] = [this.selectionVide[i],
        [
          Validators.required,
          Validators.pattern(this.selection.regex),
          Validators.minLength(this.selection.minimum.toString().length),
          Validators.maxLength(this.selection.maximum.toString().length)
        ]
      ];
    }

    this.formulaire = this.fb.group(inputs);
  }

  changementLoterie(): void {
    switch (this.loterie.url) {
      case ExtraSelection.URL: this.selection = new ExtraSelection(); break;
      case Lotto649Selection.URL: this.selection = new Lotto649Selection(); break;
      case LottoMaxSelection.URL: this.selection = new LottoMaxSelection(); break;
      case QuebecMaxSelection.URL: this.selection = new QuebecMaxSelection(); break;
      default: this.selection = new ExtraSelection(); break;
    }

    this.selectionVide = new Array(this.selection.nbreNumeros);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loterie'] && changes['loterie'].previousValue !== changes['loterie'].currentValue) {
      this.changementLoterie();
    }
  }

  //Retourne vrai s'il faut ajouter un séparateur entre chaque numéro
  avecSeparateur(i: number, longueur: number): boolean {
    return this.loterie.avecSeparateur && i < longueur - 1;
  }

  trackByIdx(idx: number): number {
    return idx;
  }

  onSubmit(): void {
    console.log('Submit');
  }

  numeroValide(position: number): boolean {
    let numero: number = this.selectionVide[position];
    let resultat: boolean = this.selection.numeroValide(numero);
    resultat = resultat && this.selection.numeroUnique(numero, this.selectionVide);

    return resultat;
  }

  selectionsValides(): boolean {
    for (let i = 0; i < 1; ++i) {
      if (!this.selection.selectionValide(this.selectionVide)) {
        return false;
      }
    }

    return true;
  }
}
