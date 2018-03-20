import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobal {
  public showNavBar: boolean;
  public loggedIn: boolean;

  public search: {
    startAt: BehaviorSubject<string>;
    endAt: BehaviorSubject<string>;
    startDate: Date;
    duration: number;
    theme: string;
    budget: string;
    numberOfTravellers: number;
    nameOfNavigator: string;
  };

  gotoHome() {
    this.router.navigate(['']);
  }

  constructor(private router: Router) {
    this.search = {
      startAt: new BehaviorSubject<string>(''),
      endAt: new BehaviorSubject<string>(''),
      startDate: new Date(),
      duration: 0,
      theme: '',
      budget: '',
      numberOfTravellers: 0,
      nameOfNavigator: ''
    };
  }
}
