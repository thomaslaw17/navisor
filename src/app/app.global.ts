import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobal {
  public showNavBar: boolean;
  public loggedIn: boolean;

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

  gotoHome() {
    this.router.navigate(['']);
  }

  constructor(private router: Router) {
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
  }
}
