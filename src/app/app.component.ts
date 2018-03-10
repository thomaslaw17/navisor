import { NavBarService } from './nav-bar.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Navisor';
  public item: Observable<any>;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService,
    private router: Router,
    public navBarService: NavBarService
  ) {
    this.navBarService.showNavbar();
    this.authService.getAuthState().subscribe(res => {
      if (res) {
        this.navBarService.showLogoutAndHideLogin();
      } else {
        this.navBarService.showLoginAndHideLogout();
      }
    });
    // if (this.authService.checkLogin()) {
    //   this.navBarService.showLogoutAndHideLogin();
    // } else {
    //   this.navBarService.showLoginAndHideLogout();
    // }
    this.item = angularFireDatabase.object('item').valueChanges();
  }

  gotoLogin() {
    this.router.navigate(['login']);
  }

  gotoRegister() {
    this.router.navigate(['register']);
  }

  logout() {
    this.authService.logout().then(
      resolve => {
        this.router.navigate(['']);
        this.navBarService.showLoginAndHideLogout();
      },
      reject => {
        console.log('Logout Error', reject);
      }
    );
  }
}
