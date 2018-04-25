export class Booking {
  public name: string;
  public navigatorId: string;
  public travellerId: string;
  public tripId: string;
  public startDateTime: string;
  public endDateTime: string;
  public price: number;
  public status: number; // 0: Submitted 1: Accepted 2: Finished 3: Rated 9: Cancelled
}
