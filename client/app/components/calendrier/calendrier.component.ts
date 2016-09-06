import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from 'angular2/core';
import { Router } from 'angular2/router';

import { DateTirage } from './../../models';

declare let $: JQueryStatic;

@Component({
  selector: 'calendrier',
  template: '<div #calendrier></div>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app/components/calendrier/calendrier.component.css']
})

export class CalendrierComponent implements AfterViewInit, OnInit  {
  @Input() loterie: string;
  @Input() date: string;
  @Input() dates: DateTirage[];

  datesJavaScript: Date[];
  datesString: string[];

  @ViewChild('calendrier') calendrier: ElementRef;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.datesJavaScript = this.dates.map(n => this.toDate(n) );
    this.datesString = this.dates.map(n => n.date);
  }

  ngAfterViewInit(): void {
    let dateTirage: DateTirage = { date: this.date, estEffectue: null };
    let dateDepart: Date = this.toDate(dateTirage);

    $(this.calendrier.nativeElement).calendar({
        clickDay: (e) => { this.clickDay(e); },
        customDayRenderer: (element, date) => { this.customDayRenderer(element, date); },
        disableNext2Year: true,
        disablePrev2Year: true,
        displayMonthHeader: true,
        language: 'fr',
        startYear: dateDepart.getFullYear(),
        startMonth: dateDepart.getMonth(),
        numDisplayedMonth: 1,
        numDisplayedMonthHeader: 3,
        enabledDays: this.datesJavaScript,
        minDate: this.datesJavaScript[0],
        maxDate: this.datesJavaScript[this.datesJavaScript.length - 1]
    });
  }

  clickDay(element: any): void {
    let date: string = element.date.toISOString().slice(0,10);

    if (date !== this.date) {
      this.router.navigate(['LoterieDetailDate', { loterie: this.loterie, date: date }]);
    }
  }

  customDayRenderer(element: any, date: Date): void {
    let dateISO: string = date.toISOString().slice(0,10);
    let pos: number = $.inArray(dateISO, this.datesString);

    if (pos > - 1) {
      let dateTirage: DateTirage = this.dates[pos];

      if (dateTirage.date === this.date) {
        $(element).addClass('courant');
      } else if (dateTirage.estEffectue) {
        $(element).addClass('precedent');
      } else {
        $(element).addClass('suivant');
      }
    }
  }

  toDate(dateTirage: DateTirage): Date {
    let date: number[] = dateTirage.date.split('-').map(n => parseInt(n, 10));
    return new Date(date[0], date[1] - 1, date[2]);
  }
}
