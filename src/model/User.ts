import { AngularFireList } from 'angularfire2/database';
export class User {
  public email: string;
  public name: string;
  public birthday: Date;
  public profilePictue: string;
  public type: number; // 0: traveller 1: navigator
  public trips: Array<string>; // List of tripID
  public chats: Array<string>; // List of chatID
}
