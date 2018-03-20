// import { NavBarService } from './services/nav-bar.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AppGlobal } from './app.global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Navisor';
  public item: Observable<any>;

  public show: boolean;
  public loggedIn: boolean;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService,
    private router: Router,
    public appGlobal: AppGlobal // public navBarService: NavBarService
  ) {
    // this.navBarService.showNavbar();
    // this.authService.getAuthState().subscribe(res => {
    //   if (res) {
    //     this.navBarService.showLogoutAndHideLogin();
    //   } else {
    //     this.navBarService.showLoginAndHideLogout();
    //   }
    // });
    // if (this.authService.checkLogin()) {
    //   this.navBarService.showLogoutAndHideLogin();
    // } else {
    //   this.navBarService.showLoginAndHideLogout();
    // }
    this.show = true;
    if (this.authService.checkLogin()) {
      this.loggedIn = true;
      this.appGlobal.loggedIn = true;
    } else {
      this.loggedIn = false;
      this.appGlobal.loggedIn = false;
    }

    this.item = angularFireDatabase.object('item').valueChanges();
  }
}
