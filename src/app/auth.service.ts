import { Observable } from 'rxjs/Observable';
import { User } from './../model/User';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  checkLogin() {
    return this.afAuth.authState ? true : false;
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Login Success', value);
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          alert('wrong email or password');
        } else {
          alert(error.message);
        }
      });
  }

  loginWithFb() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(value => {
        console.log('Login Success', value);
      })
      .catch(error => {
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

  // return true if register successful
  // return false if register failed.
  register(user: User, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, password)
      .then(value => {
        console.log('Register Success', value);
      })
      .catch(error => {
        if (error !== null) {
          switch (error.code) {
            case 'auth/weakpassword':
              alert('Please choose a better password');
              return false;
            case 'auth/email-already-in-use':
              alert('Email already in use');
              return false;
            case 'auth/invalid-email':
              alert('Please enter a valid email');
              return false;
            default:
              alert(error.message);
              return false;
          }
        }
      });
  }
}
