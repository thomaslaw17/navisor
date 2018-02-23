import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobal {
  public search: {
    location: string;
    startDate: Date;
    endDate: Date;
    theme: string;
    budget: number;
    numberOfTravellers: number;
    nameOfNavigator: string;
  };
}
