import { AngularFireList } from 'angularfire2/database';
export class User {
  public address: string;
  public birthday: Date;
  public email: string;
  public gender: string;
  public language: string;
  public name: string;
  public nickName: string;
  public phoneNumber: string;
  public photoURl: string; // profile picture url
  public recoveryEmail: string;
  public selfIntroduction: string;
  public type: number; // 0: traveller 1: navigator
  public trips: Array<string>; // List of tripID
  public chats: Array<string>; // List of chatID
}
