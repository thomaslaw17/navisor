import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  checkLogin() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        if (error.code === 'auth/wrong-password') {
          alert('wrong email or password');
        } else {
          alert(error.message);
        }
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  register(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        if (error.code === 'auth/weakpassword') {
          alert('Please choose a better password');
        } else {
          alert(error.message);
        }
      });
  }
}
