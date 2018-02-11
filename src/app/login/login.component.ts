import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public loginState: boolean;

  constructor(
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private router: Router
  ) {}

  login() {
    this.authService
      .login(this.email, this.password)
      .then(res => {
        console.log('Login Success', res);
        this.router.navigate(['home']);
      })
      .catch(reject => {
        if (reject.code === 'auth/wrong-password') {
          alert('wrong email or password');
        } else {
          alert(reject.message);
        }
      });
  }

  loginWithFb() {
    this.authService
      .loginWithFb()
      .then(success => {
        console.log('Login Success', success);
      })
      .catch(reject => {
        if (reject.code === 'auth/wrong-password') {
          alert('wrong email or password');
        } else {
          alert(reject.message);
        }
      });
  }

  gotoRegister() {
    this.router.navigate(['register']);
  }

  ngOnInit() {
    this.loginState = this.authService.checkLogin();

    if (this.loginState) {
      this.router.navigate(['home']);
    }
  }
}
