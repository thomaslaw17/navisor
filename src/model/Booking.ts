export class Booking {
  public navigatorId: string;
  public travellerId: string;
  public tripId: string;
  public startDateTime: Date;
  public endDateTime: Date;
  public price: number;
  public status: number; // 0: Submitted 1: Accepted 2: Finished 3: Rated 9: Cancelled
}
