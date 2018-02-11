import { AngularFireList } from 'angularfire2/database';
export class User {
  public email: string;
  public name: string;
  public birthday: Date;
  public profilePictue: String;
  public type: number; // 0: traveller 1: navigator
  public trips: AngularFireList<String>; // List of tripID
  public chats: AngularFireList<String>; // List of chatID
}
