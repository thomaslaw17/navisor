import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from './../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  private userRef: AngularFireList<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.userRef = angularFireDatabase.list('User');
  }

  checkLogin() {
    return firebase.auth().currentUser ? true : false;
  }

  getAuthState() {
    return firebase.auth().currentUser;
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithFb() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  // return true if register successful
  // return false if register failed.
  register(user: User, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, password);
  }

  // registerWithFb(){
  //   return this.afAuth.createUserWithFb()
  // }
}
