import { AppGlobal } from './../app.global';
import { Injectable } from '@angular/core';

@Injectable()
export class NavBarService {
  public show: boolean;
  public loggedIn: boolean;

  constructor(private appGlobal: AppGlobal) {
    this.show = true;
    appGlobal.showNavBar = true;
  }

  showNavbar() {
    if (!this.show) {
      this.show = true;
      this.appGlobal.showNavBar = true;
    }
  }

  hideNavBar() {
    if (this.show) {
      this.show = false;
      this.appGlobal.showNavBar = false;
    }
  }

  showLoginAndHideLogout() {
    if (this.loggedIn) {
      this.loggedIn = false;
      this.appGlobal.showNavBar = false;
    }
  }

  showLogoutAndHideLogin() {
    if (!this.loggedIn) {
      this.loggedIn = true;
      this.appGlobal.showNavBar = true;
    }
  }
}
