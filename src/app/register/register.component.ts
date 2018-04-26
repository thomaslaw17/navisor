import { AppGlobal } from './../app.global';
import { Chat } from './../../model/Chat';
import { NavBarService } from './../services/nav-bar.service';
import { AuthService } from './../services/auth.service';
import { User } from './../../model/User';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../../model/Message';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;

  private userObj: AngularFireObject<User>;
  public password: string;
  public passwordCheck: string;
  public termsAndConditions: boolean;

  public step: number;

  public birthDay: number;
  public birthMonth: number;
  public birthYear: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService,
    private appGlobal: AppGlobal
  ) {
    this.user = new User();
  }

  userType(userType: number) {
    this.user.type = userType;
  }

  gender(gender: string) {
    this.user.gender = gender;
  }

  register() {
    if (
      this.birthDay !== undefined &&
      this.birthDay !== null &&
      this.birthDay > 0 &&
      this.birthMonth !== undefined &&
      this.birthMonth !== null &&
      this.birthDay > 0 &&
      this.birthYear !== undefined &&
      this.birthYear !== null &&
      this.birthYear > 1800
    ) {
      this.user.birthday =
        this.birthYear + '-' + this.birthMonth + '-' + this.birthDay;
    } else {
      alert('Please enter a valid birthday');
    }
    let msg = 'Please fill in your ';
    if (
      this.user.firstName === undefined ||
      this.user.firstName === null ||
      this.user.firstName === ''
    ) {
      msg += 'First Name ';
    }
    if (
      this.user.lastName === undefined ||
      this.user.lastName === null ||
      this.user.lastName === ''
    ) {
      msg += 'Last Name ';
    }

    if (msg !== 'Please fill in your ' && this.termsAndConditions) {
      alert('Please accept the terms and conditions');
      return;
    } else if (msg !== 'Please fill in your ') {
      alert(msg);
      return;
    }

    if (this.password !== this.passwordCheck) {
      alert('Password not Match');
      return;
    }

    this.user.photoUrl =
      'https://firebasestorage.googleapis.com/v0/b/' +
      'navisor-b9b70.appspot.com/o/user%2Fperson.png?alt=media&token=5f2fe16b-6f3f-4d19-ac5a-f454d3ac130a';

    this.authService
      .register(this.user, this.password)
      .then(value => {
        this.authService.sendEmailVerification();
        this.userObj = this.angularFireDatabase.object('User/' + value.uid);
        this.userObj.set(this.user).then(_ => {
          const chat = new Chat();
          this.appGlobal.userId = value.uid;
          this.appGlobal.userType = value.type;
          this.appGlobal.loggedIn = true;
          if (this.user.type === 0) {
            chat.travellerId = value.uid;
            chat.navigatorId = '2d3B80sn5lgChNDycG4M07pHyOi2'; // userID of the customer service account
          } else {
            chat.navigatorId = value.uid;
            chat.travellerId = 'tFVAffzuaaebKIH7lSUjp3Pkw8B2'; // userID of the customer service account
          }
          this.angularFireDatabase
            .list('Chat')
            .push(chat)
            .then(newChat => {
              this.angularFireDatabase
                .list('User/' + chat.travellerId + '/chats')
                .push(newChat.key);
              this.angularFireDatabase
                .list('User/' + chat.navigatorId + '/chats')
                .push(newChat.key);

              const message = new Message();
              message.data =
                'Hello, ' +
                this.user.nickName +
                '! Welcome to Navisor. How can I help you!';
              message.senderId =
                chat.travellerId === this.appGlobal.userId
                  ? chat.navigatorId
                  : chat.travellerId;
              message.type = 0;
              this.angularFireDatabase
                .list('Chat/' + newChat.key + '/messages')
                .push(message)
                .then(newMessage => {
                  this.router.navigate(['profile']);
                  console.log('Register Success');
                });
            });
        });
      })
      .catch(error => {
        if (error !== null) {
          switch (error.code) {
            case 'auth/weakpassword':
              alert('Please choose a better password');
              break;
            case 'auth/email-already-in-use':
              alert('Email already in use');
              break;
            case 'auth/invalid-email':
              alert('Please enter a valid email');
              break;
            default:
              alert(error.message);
          }
        }
      });
  }

  nextStep() {
    switch (this.step) {
      case 1:
        this.step++;
        break;
      case 2:
        let msg = 'Please fill in your ';
        if (
          this.user.email === undefined ||
          this.user.email === null ||
          this.user.email === ''
        ) {
          msg += 'Email ';
        }
        if (
          this.user.recoveryEmail === undefined ||
          this.user.recoveryEmail === null ||
          this.user.recoveryEmail === ''
        ) {
          msg += 'Recovery Mail ';
        }
        if (
          this.password === undefined ||
          this.password === null ||
          this.password === ''
        ) {
          msg += 'Password ';
        }
        if (
          this.passwordCheck !== this.password &&
          msg === 'Please fill in your '
        ) {
          msg = 'Password not match!';
        }
        if (msg !== 'Please fill in your ') {
          alert(msg);
        } else {
          this.step++;
        }
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.step = 1;
    this.navBarService.showNavbar();
  }
}
