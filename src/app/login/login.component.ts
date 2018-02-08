import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginState: boolean;

  constructor(
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private router: Router
  ) {
    this.loginState = authService.checkLogin();
  }

  login() {
    this.authService.login(this.email, this.password);
  }

  logout() {
    this.authService.logout();
  }

  gotoRegister() {
    this.router.navigate(['register']);
  }

  ngOnInit() {}
}
