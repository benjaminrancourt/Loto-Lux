import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { DateFormatPipe } from 'angular2-moment';
import moment from 'moment';

import {
  CalendrierComponent,
  LoterieComponent,
  LoteriesComponent,

  FonctionnalitesComponent,
  PresentationComponent,
  AccueilComponent,

  LoterieDetailComponent,
  PiedDePageComponent,
  AppComponent
  } from './components';

import { DateService, LoterieService, TirageService } from './services';
import { routing } from './app.routing';

moment.locale('fr-ca');

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [
    DateFormatPipe,

    CalendrierComponent,
    LoterieComponent,
    LoteriesComponent,

    FonctionnalitesComponent,
    PresentationComponent,
    AccueilComponent,

    LoterieDetailComponent,
    PiedDePageComponent,
    AppComponent
  ],
  providers: [
    AUTH_PROVIDERS, DateService, LoterieService, TirageService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
