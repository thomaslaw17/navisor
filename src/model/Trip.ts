import { AngularFireList } from 'angularfire2/database';

export class Trip {
  public DRAFT = 0;
  public WAITING = 1;
  public ACCEPTED = 2;
  public FINISHED = 3;
  public PAID = 4;
  public ERROR = 99;

  public navigatorId: string;
  public travellerId: string;
  public status: number; // 0: draft 1: waiting for adoption 2: accepted 3: finished 4: paid 99: Error
  public events: AngularFireList<Event>;
}
