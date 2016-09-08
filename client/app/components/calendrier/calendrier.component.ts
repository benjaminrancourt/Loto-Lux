import { AfterViewInit, Component, ElementRef, EventEmitter,
  Input, OnChanges, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { DateTirage } from './../../models';

declare let $: JQueryStatic;

@Component({
  selector: 'calendrier',
  template: '<div #calendrier></div>',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app/components/calendrier/calendrier.component.css']
})

export class CalendrierComponent implements AfterViewInit, OnChanges  {
  @Input() loterie: string;
  @Input() date: string;
  @Input() dates: DateTirage[];
  @Output() onChangementDate: EventEmitter<string>;

  datesJavaScript: Date[];
  datesString: string[];

  @ViewChild('calendrier') calendrier: ElementRef;

  constructor(private router: Router) {
    this.onChangementDate = new EventEmitter<string>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let loterie: string = changes['loterie'] ? 'loterie ' : '';
    let date: string = changes['date'] ? 'date ' : '';
    let dates: string = changes['dates'] ? 'dates ' : '';

    if (changes['date']) { this.miseAJourDate(); }
    if (changes['dates']) { this.miseAJourDates(); }
  }

  ngAfterViewInit(): void {
    this.miseAJourDate();
    this.miseAJourDates();

    $(this.calendrier.nativeElement).calendar({
        clickDay: (e) => { this.clickDay(e); },
        customDayRenderer: (element, date) => { this.customDayRenderer(element, date); },
        disableNext2Year: true,
        disablePrev2Year: true,
        displayMonthHeader: true,
        language: 'fr',
        numDisplayedMonth: 1,
        numDisplayedMonthHeader: 3
    });
  }

  miseAJourDate(): void {
    let dateTirage: DateTirage = { date: this.date, estEffectue: null };
    let dateDepart: Date = this.toDate(dateTirage);
    let calendrier: any = $(this.calendrier.nativeElement).data('calendar');

    if (calendrier) {
      calendrier.setYear(dateDepart.getFullYear());
      calendrier.setMonth(dateDepart.getMonth());
    }
  }

  miseAJourDates(): void {
    this.datesJavaScript = this.dates.map(n => this.toDate(n) );
    this.datesString = this.dates.map(n => n.date);
    let calendrier: any = $(this.calendrier.nativeElement).data('calendar');

    if (calendrier) {
      calendrier.setEnabledDays(this.datesJavaScript);
      calendrier.setMinDate(this.datesJavaScript[0]);
      calendrier.setMaxDate(this.datesJavaScript[this.datesJavaScript.length - 1]);
    }
  }

  clickDay(element: any): void {
    let date: string = element.date.toISOString().slice(0,10);

    if (date !== this.date) {
      this.onChangementDate.emit(date);
      this.date = date;
      $(this.calendrier.nativeElement).data('calendar')._render();
    }
  }

  customDayRenderer(element: any, date: Date): void {
    let dateISO: string = date.toISOString().slice(0,10);
    let pos: number = $.inArray(dateISO, this.datesString);

    if (pos > -1) {
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
