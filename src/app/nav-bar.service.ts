import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';

@Injectable()
export class NavBarService {
  public show: boolean;
  public loggedIn: boolean;

  constructor() {
    this.show = true;
  }

  showNavbar() {
    if (!this.show) {
      this.show = true;
    }
  }

  hideNavBar() {
    if (this.show) {
      this.show = false;
    }
  }

  showLoginAndHideLogout() {
    if (this.loggedIn) {
      this.loggedIn = false;
    }
  }

  showLogoutAndHideLogin() {
    if (!this.loggedIn) {
      this.loggedIn = true;
    }
  }
}
