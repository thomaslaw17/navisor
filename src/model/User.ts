import { Rating } from './Rating';

export class User {
  public addressStreet: string;
  public addressCity: string;
  public addressState: string;
  public birthday: string;
  public email: string;
  public gender: string;
  public language: string;
  public nationality: string;
  public firstName: string;
  public lastName: string;
  public nickName: string;
  public phoneNumber: string;
  public photoUrl: string; // profile picture url
  public recoveryEmail: string;
  public selfIntroduction: string;
  public rewardPoints: number;
  public type: number; // 0: traveller 1: navigator
  public bookings: Array<string>; // List of tripID
  public chats: Array<string>; // List of chatID
  public ratings: Array<Rating>;
}
