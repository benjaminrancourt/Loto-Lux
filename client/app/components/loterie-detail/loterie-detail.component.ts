import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DateTirage, Loterie, Tirage } from '../../models';
import { AuthService, DateService, LoterieService, TirageService } from '../../services';

@Component({
  selector: 'loterie-detail',
  providers: [ AuthService ],
  templateUrl: './app/components/loterie-detail/loterie-detail.component.html',
  styleUrls: ['./app/components/loterie-detail/loterie-detail.component.css']
})

export class LoterieDetailComponent implements OnInit {
  loterie: Loterie;
  tirage: Tirage;
  date: string;
  dateFormate: string;
  dates: DateTirage[];

  constructor(
    private auth: AuthService,
    private dateService: DateService,
    private loterieService: LoterieService,
    private tirageService: TirageService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  ngOnInit(): void {
    interface IRouteParams {
      loterie: string;
      date: string;
    }

    this.route.params.forEach((params: IRouteParams) => {
      let loterie: string = params.loterie;
      let date: string = params.date;

      this.recupererLoterie(loterie, date);
    });
  }

  private recupererLoterie(url: string, date: string): void {
    //Recupère la loterie
    this.loterieService.recupererParURL(url).then(loterie => {
      this.loterie = loterie;

      //Si la date a été spécifié, ajoute les informations pertinentes
      if (date !== undefined) {
        this.onChangementDate(date);
      } else {
        this.tirage = this.loterie.dernierTirage;
        this.date = this.loterie.dernierTirage.date;
        this.location.go('/loteries/' + this.loterie.url + '/' + this.date);
      }

      this.dateService.recuperer(url).then(dates => this.dates = dates);
    });
  }

  private onChangementDate(date: string): void {
    this.location.go('/loteries/' + this.loterie.url + '/' + date);
    this.tirageService.recuperer(this.loterie.url, date).then(tirage => {
      this.tirage = tirage;
      this.date = date;
    });
  }
}
