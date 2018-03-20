import { NavBarService } from './../services/nav-bar.service';
import { AuthService } from './../services/auth.service';
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

  public birthDay: number;
  public birthMonth: number;
  public birthYear: number;

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
      this.user.birthday = new Date(
        this.birthDay +
          '-' +
          this.birthMonth +
          '-' +
          this.birthYear +
          'T00:00:00'
      );
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
        this.router.navigate(['']);
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

  previousStep() {
    this.step--;
  }

  ngOnInit() {
    this.step = 1;
    this.navBarService.showNavbar();
  }
}
