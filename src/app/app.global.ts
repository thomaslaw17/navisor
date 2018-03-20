import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobal {
  public search: {
    location: string;
    startDate: Date;
    endDate: Date;
    theme: string;
    budget: string;
    numberOfTravellers: number;
    nameOfNavigator: string;
  };

  constructor() {
    this.search = {
      location: '',
      startDate: new Date(),
      endDate: new Date(),
      theme: '',
      budget: '',
      numberOfTravellers: 0,
      nameOfNavigator: ''
    };
  }
}
