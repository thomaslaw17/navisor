import { NavBarService } from './../nav-bar.service';
import { AuthService } from './../auth.service';
import { User } from './../../model/User';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService
  ) {
    this.user = new User();
  }

  userType(userType: number) {
    this.user.type = userType;
    this.nextStep();
  }

  gender(gender: string) {
    this.user.gender = gender;
  }

  register() {
    if (this.termsAndConditions) {
      alert('Please accept the terms and conditions');
      return;
    }

    if (this.password !== this.passwordCheck) {
      alert('Password not Match');
      return;
    }

    this.authService
      .register(this.user, this.password)
      .then(value => {
        this.authService.sendEmailVerification();
        this.userObj = this.angularFireDatabase.object('User/' + value.uid);
        this.userObj.set(this.user);
        this.router.navigate(['home']);
        console.log('Register Success');
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
          this.user.name === undefined ||
          this.user.name === null ||
          this.user.name === ''
        ) {
          msg += 'User Name ';
        }
        if (
          this.user.email === undefined ||
          this.user.email === null ||
          this.user.name === ''
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
          msg += 'Password';
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

  previousStep() {
    this.step--;
  }

  ngOnInit() {
    this.step = 1;
    this.navBarService.showNavbar();
  }
}
