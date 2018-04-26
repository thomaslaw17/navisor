import { Rating } from './Rating';
import { Event } from './Event';
export class Trip {
  public navigatorId: string;
  public travellerId: string;
  public catagory: string;
  public price: number;
  public startTime: string;
  public name: string;
  public endTime: string;
  public numberOfTravellers: number;
  public events: Array<Event>;
  public description: string;
  public duration: number; // in days
  public language: string;
  public theme: string;
  public remark: string;
  public photoUrl: string;
  public status: number; // 0: waiting for navigator 1: ready to go
  public rating: Array<Rating>;
}
