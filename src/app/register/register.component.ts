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
  private user: User;
  private userRef: AngularFireList<User>;
  private password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.userRef = angularFireDatabase.list('user');
  }

  register() {
    if (this.authService.register(this.user, this.password)) {
      this.authService.getAuthState().subscribe(
        auth => {
          if (auth !== null) {
            this.userRef.push(this.user);
          }
        },
        error => alert(error),
        () => {}
      );
    } else {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {}
}
