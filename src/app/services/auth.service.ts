import { AppGlobal } from './../app.global';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from './../../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  private userRef: AngularFireList<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase,
    private appGlobal: AppGlobal
  ) {
    this.userRef = angularFireDatabase.list('User');
  }

  checkLogin() {
    this.afAuth.authState.subscribe(res => {
      if (res) {
        this.appGlobal.loggedIn = true;
        return true;
      } else {
        this.appGlobal.loggedIn = false;
        return false;
      }
    });
    // return firebase.auth().currentUser ? true : false;
  }

  getAuthState() {
    return this.afAuth.authState;
    // return firebase.auth().currentUser;
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithFb() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  // return true if register successful
  // return false if register failed.
  register(user: User, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      password
    );
  }

  sendEmailVerification() {
    this.afAuth.authState.subscribe(newUser => {
      newUser
        .sendEmailVerification()
        .then(() => console.log('Confirmation Email sent'))
        .catch(err => console.log(err));
    });
  }

  resetPassword() {
    return null;
  }

  sendResetPasswordEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  // registerWithFb(){
  //   return this.afAuth.createUserWithFb()
  // }
}
