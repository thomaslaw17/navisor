import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobal {
  public showNavBar: boolean;
  public loggedIn: boolean;

  public userId: string;

  public search: {
    location: string;
    startAt: BehaviorSubject<string>;
    endAt: BehaviorSubject<string>;
    startDate: Date;
    duration: number;
    theme: Array<string>;
    budgetMax: number;
    budgetMin: number;
    numberOfTravellers: number;
    nameOfNavigator: string;
  };

  public searchFilter: {
    budgetFilter: {
      0: boolean;
      1: boolean;
      2: boolean;
      3: boolean;
    };
    themeFilter: {
      culturalheritage: boolean;
      nature: boolean;
      foodie: boolean;
      photography: boolean;
      university: boolean;
      others: boolean;
    };
    languageFilter: {
      english: boolean;
      mandarin: boolean;
      french: boolean;
      german: boolean;
      italian: boolean;
      others: boolean;
    };
  };

  public payment: {
    tripId: string;
    amount: number;
  };

  gotoHome() {
    this.router.navigate(['']);
  }

  constructor(private router: Router) {
    this.userId = '';

    this.search = {
      location: '',
      startAt: new BehaviorSubject<string>(''),
      endAt: new BehaviorSubject<string>(''),
      startDate: new Date(),
      duration: 0,
      theme: new Array<string>(),
      budgetMax: 0,
      budgetMin: 0,
      numberOfTravellers: 0,
      nameOfNavigator: ''
    };

    this.searchFilter = {
      budgetFilter: {
        0: true,
        1: true,
        2: true,
        3: true
      },
      themeFilter: {
        culturalheritage: true,
        nature: true,
        foodie: true,
        photography: true,
        university: true,
        others: true
      },
      languageFilter: {
        english: true,
        mandarin: true,
        french: true,
        german: true,
        italian: true,
        others: true
      }
    };
    this.payment = {
      amount: 0,
      tripId: ''
    };
  }
}
