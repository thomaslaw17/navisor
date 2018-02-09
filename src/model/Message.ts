export class Message {
  public TEXT = 0;
  public PHOTO = 1;

  public senderType: number;
  public data: string; // can be a text message or photo directory
  public type: number; // 0: text 1: photo
}
