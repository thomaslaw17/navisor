import { AuthService } from './../auth.service';
import { User } from './../../model/User';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public email: string;
  public name: string;
  public birthday: Date;
  public accountType: string;
  public userType: number;

  private userRef: AngularFireList<User>;
  public password: string;
  public passwordCheck: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.user = new User();
    this.userRef = angularFireDatabase.list('user');
  }

  register() {
    if (this.password !== this.passwordCheck) {
      alert('Password not Match');
      return;
    }

    this.user.email = this.email;
    this.user.name = this.name;
    this.user.birthday = this.birthday;
    this.user.type = this.userType;

    this.authService
      .register(this.user, this.password)
      .then(value => {
        this.userRef.push(this.user);
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

  ngOnInit() {}
}
