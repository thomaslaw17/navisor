import { AppGlobal } from './../app.global';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('trigger', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(
          ':enter',
          stagger('300ms', [
            animate(
              '.6s ease-in',
              keyframes([
                style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                style({
                  opacity: 0.5,
                  transform: 'translateY(35px)',
                  offset: 0.3
                }),
                style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
              ])
            )
          ]),
          { optional: true }
        )
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  public themes: Array<string>;
  public budgets: Array<string>;
  public numberOfTravellers: Array<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public appGlobal: AppGlobal
  ) {}

  search() {
    let filled = false;
    let alerted = false;
    const today = new Date();
    if (
      this.appGlobal.search.location !== undefined &&
      this.appGlobal.search.location !== null &&
      this.appGlobal.search.location !== ''
    ) {
      filled = true;
    }
    if (
      this.appGlobal.search.startDate !== undefined &&
      this.appGlobal.search.startDate !== null
    ) {
      filled = true;
      if (this.appGlobal.search.startDate < today && !alerted) {
        alerted = true;
        filled = false;
        alert('Start date is before date');
      }
      if (
        this.appGlobal.search.endDate !== undefined &&
        this.appGlobal.search.endDate !== null
      ) {
        filled = true;
        if (this.appGlobal.search.endDate < today && !alerted) {
          alert('End date is before today');
          alerted = true;
          filled = false;
        }
        if (
          this.appGlobal.search.endDate < this.appGlobal.search.startDate &&
          !alerted
        ) {
          alert('Start date is after end date');
          alerted = true;
          filled = false;
        }
      }
    }
    if (
      this.appGlobal.search.theme !== undefined &&
      this.appGlobal.search.theme !== null &&
      this.appGlobal.search.theme !== ''
    ) {
      filled = true;
    }
    if (
      this.appGlobal.search.budget !== undefined &&
      this.appGlobal.search.budget !== null
    ) {
      filled = true;
      // if (this.appGlobal.search.budget == 0 && !alerted) {
      //   alert('Budget below zero');
      // }
    }
    if (
      this.appGlobal.search.numberOfTravellers !== undefined &&
      this.appGlobal.search.numberOfTravellers !== null &&
      this.appGlobal.search.numberOfTravellers !== 0
    ) {
      filled = true;
    }
    if (
      this.appGlobal.search.nameOfNavigator !== undefined &&
      this.appGlobal.search.nameOfNavigator !== null &&
      this.appGlobal.search.nameOfNavigator !== ''
    ) {
      filled = true;
    }
    if (!filled) {
      alert('Please enter valid arguement for search');
    } else {
      this.router.navigate(['search']);
    }
  }

  ngOnInit() {
    this.themes = [
      'Theme',
      'Cultural & Heritage',
      'Nature',
      'Foodie',
      'Photography',
      'University Tour',
      'Others'
    ];

    this.budgets = [
      'Budget',
      '$500-$1000',
      '$1001-$1500',
      '$1501-$2000',
      '$2000+'
    ];

    this.numberOfTravellers = [
      'Number of travellers',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10'
    ];
    if (
      this.appGlobal.search.theme === undefined ||
      this.appGlobal.search.theme === null
    ) {
      this.appGlobal.search.theme = 'Theme';
    }
    if (
      this.appGlobal.search.location === undefined ||
      this.appGlobal.search.location === null
    ) {
      this.appGlobal.search.location = 'Location';
    }
    if (
      this.appGlobal.search.budget === undefined ||
      this.appGlobal.search.budget === null
    ) {
      this.appGlobal.search.budget = 'Budget';
    }
  }
}
