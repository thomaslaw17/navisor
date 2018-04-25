import { Rating } from './Rating';
import { Event } from './Event';
export class Trip {
  public navigatorId: string;
  public travellerID: string;
  public catagory: string;
  public price: string;
  public startDate: Date;
  public name: string;
  public endDate: Date;
  public numberOfTravellers: number;
  public events: Array<Event>;
  public description: string;
  public duration: number; // in days
  public language: string;
  public theme: string;
  public remark: string;
  public photoUrl: string;
  public status: number; // 0: pending 1: published 2: finished 9: rejected
  public rating: Array<Rating>;
}
