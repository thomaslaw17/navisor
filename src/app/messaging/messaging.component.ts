import { UtilService } from './../services/util.service';
import { User } from './../../model/User';
import { AppGlobal } from './../app.global';
import { Message } from './../../model/Message';
import { Chat } from './../../model/Chat';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../services/auth.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  @Input() user: User;

  public tab: string;
  public currentChatId: string;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService,
    private util: UtilService
  ) {}

  updateCurrentChat(event) {
    this.currentChatId = event;
    this.tab = 'chat';
  }

  changeTab(event) {
    this.tab = event;
  }

  ngOnInit() {
    this.tab = 'list';
    this.user.chats = this.util.objectToArray(this.user.chats);
  }
}

@Component({
  selector: 'app-messaging-chat-item',
  templateUrl: './messaging-chat-item.component.html',
  styleUrls: ['./messaging-chat-item.component.css']
})
export class MessagingChatItemComponent implements OnInit {
  @Input() chatId: string;

  @Output() currentChatId: EventEmitter<string> = new EventEmitter<string>();

  public chatObj: Observable<Chat>;
  public chat: Chat;
  public targetObj: Observable<User>;
  public target: User;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private appGlobal: AppGlobal
  ) {}

  updateCurrentChatId() {
    this.currentChatId.emit(this.chatId);
  }

  ngOnInit() {
    this.chat = new Chat();
    this.target = new User();
    this.chatObj = this.angularFireDatabase
      .object<Chat>('Chat/' + this.chatId)
      .valueChanges();
    this.chatObj.subscribe(chat => {
      this.chat = chat;
      let targetId = '';
      if (this.appGlobal.userId === chat.travellerId) {
        targetId = chat.navigatorId;
      } else {
        targetId = chat.travellerId;
      }
      this.targetObj = this.angularFireDatabase
        .object<User>('User/' + targetId)
        .valueChanges();
      this.targetObj.subscribe(user => {
        if (user !== undefined && user !== null) {
          this.target = user;
        }
      });
    });
  }
}

@Component({
  selector: 'app-messaging-chat',
  templateUrl: './messaging-chat.component.html',
  styleUrls: ['./messaging-chat.component.css']
})
export class MessagingChatComponent implements OnInit {
  @Input() chatId: string;

  @Output() changeTab: EventEmitter<string> = new EventEmitter<string>();

  private chatObj: Observable<Chat>;
  private messageList: AngularFireList<Message>;
  public chat: Chat;
  public from: boolean;
  public targetId: string;
  public target: User;

  public message: string;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private appGlobal: AppGlobal,
    private util: UtilService
  ) {}

  back() {
    this.changeTab.emit('list');
  }

  sendMessage() {
    if (
      this.message !== undefined &&
      this.message !== null &&
      this.message !== ''
    ) {
      const newMessage = new Message();
      newMessage.data = this.message;
      newMessage.senderId = this.appGlobal.userId;
      newMessage.type = 0;
      this.messageList.push(newMessage);
      this.message = '';
    }
  }

  ngOnInit() {
    this.chat = new Chat();
    this.target = new User();
    this.chatObj = this.angularFireDatabase
      .object<Chat>('Chat/' + this.chatId)
      .valueChanges();
    this.chatObj.subscribe(chat => {
      this.chat = chat;
      this.chat.messages = new Array<Message>();
      this.messageList = this.angularFireDatabase.list<Message>(
        'Chat/' + this.chatId + '/messages'
      );

      if (this.appGlobal.userType === 0) {
        this.targetId = chat.navigatorId;
      } else {
        this.targetId = chat.travellerId;
      }

      this.angularFireDatabase
        .object<User>('User/' + this.targetId)
        .valueChanges()
        .subscribe(user => {
          this.target = user;
        });
      this.messageList.snapshotChanges(['child_added']).subscribe(actions => {
        actions.forEach(action => {
          this.chat.messages.push(action.payload.val());
        });
      });
    });
  }
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message: Message;

  public from: boolean;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private appGlobal: AppGlobal
  ) {}

  ngOnInit() {}
}
