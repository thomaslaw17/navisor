import { Event } from './Event';
export class Trip {
  public navigatorId: string;
  public travellerId: string;
  public status: number; // 0: draft 1: waiting for adoption 2: accepted 3: finished 4: paid 99: Error
  public events: Array<Event>;
}
