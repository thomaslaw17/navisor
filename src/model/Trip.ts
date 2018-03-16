import { Event } from './Event';
export class Trip {
  public navigatorId: string;
  public travellerID: string;
  public price: string;
  public startDate: Date;
  public name: string;
  public endDate: Date;
  public numberOfTravellers: number;
  public events: Array<Event>;
  public description: string;
  public theme: string;
  public status: number; // 0: pending 1: published
}
