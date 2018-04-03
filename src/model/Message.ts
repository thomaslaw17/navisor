export class Message {
  public senderId: string;
  public data: string; // can be a text message or photo directory
  public type: number; // 0: text 1: photo
}
