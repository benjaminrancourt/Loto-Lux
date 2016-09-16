import { Component } from '@angular/core';
import { Loterie } from './../../models';
import { AuthService, LoterieService } from './../../services';

@Component({
  selector: 'my-app',
  providers: [ AuthService ],
  templateUrl: './app/components/app/app.component.html',
  styleUrls: ['./app/components/app/app.component.css']
})

export class AppComponent {
  loteries: Loterie[];
  error: any;

  constructor(private auth: AuthService, private service: LoterieService) { }

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
