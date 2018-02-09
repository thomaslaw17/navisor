import { Message } from './Message';
import { AngularFireList } from 'angularfire2/database';
export class Chat {
  public navigatorId: string;
  public travellerId: string;
  public message: AngularFireList<Message>;
}
