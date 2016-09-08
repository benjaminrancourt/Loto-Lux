import { Component } from '@angular/core';
import { Loterie } from './../../models';
import { LoterieService } from './../../services';

@Component({
  selector: 'my-app',
  templateUrl: './app/components/app/app.component.html',
  styleUrls: ['./app/components/app/app.component.css']
})

export class AppComponent {
  loteries: Loterie[];
  error: any;

  constructor(private service: LoterieService) { }

  //Recupère les loteries à l'initialisation
  ngOnInit(): void {
    this.getLoteries();
  }

  //Retourne les informations sommaires de toutes les loteries
  getLoteries(): void {
    this.service.recuperer()
      .then(loteries => {
        this.loteries = loteries;
      })
      .catch(error => this.error = error);
  }
}
