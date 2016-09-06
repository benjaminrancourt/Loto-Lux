import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
//import { DateFormatPipe } from 'angular2-moment';

import { DateTirage, Loterie, Tirage } from '../../models';
import { DateService, LoterieService, TirageService } from '../../services';
import { CalendrierComponent, LoterieComponent } from './..';

@Component({
  templateUrl: './app/components/loterie-detail/loterie-detail.component.html',
  styleUrls: ['./app/components/loterie-detail/loterie-detail.component.css'],
  directives: [CalendrierComponent, LoterieComponent]//,
  //pipes: [DateFormatPipe]
})

export class LoterieDetailComponent implements OnInit {
  loterie: Loterie;
  tirage: Tirage;
  date: string;
  dateFormate: string;
  dates: DateTirage[];

  constructor(
    private dateService: DateService,
    private loterieService: LoterieService,
    private tirageService: TirageService,
    private routeParams: RouteParams) {
  }

  ngOnInit(): void {
    this.recupererLoterie();
  }

  private recupererLoterie(): void {
    let url: string = this.routeParams.get('loterie');
    let date: string = this.routeParams.get('date');

    //Recupère la loterie
    this.loterieService.recupererParURL(url).then(loterie => {
      this.loterie = loterie;

      //Si la date a été spécifié, ajoute les informations pertinentes
      if (date !== null) {
        this.tirageService.recuperer(url, date).then(tirage => {
          this.tirage = tirage;
          this.date = date;
        });
      } else {
        this.tirage = this.loterie.dernierTirage;
        this.date = this.loterie.dernierTirage.date;
      }

      this.dateService.recuperer(url).then(dates => this.dates = dates);
    });
  }
}
