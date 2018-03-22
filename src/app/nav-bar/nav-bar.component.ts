import { User } from './../../model/User';
import { AppGlobal } from './../app.global';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() show: boolean;
  @Input() loggedIn: boolean;

  public user: User;
  public userObj: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private appGlobal: AppGlobal
  ) {}

  ngOnInit() {
    this.user = new User();
    this.authService.getAuthState().subscribe(res => {
      if (res !== undefined && res !== null) {
        this.userObj = this.angularFireDatabase
          .object<User>('User/' + this.appGlobal.userId)
          .valueChanges();
        this.userObj.subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  logout() {
    this.authService.logout().then(
      resolve => {
        this.router.navigate(['']);
      },
      reject => {
        console.log('Logout Error', reject);
      }
    );
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }

  gotoRegister() {
    this.router.navigate(['register']);
  }

  gotoProfile() {
    this.router.navigate(['profile']);
  }
}
