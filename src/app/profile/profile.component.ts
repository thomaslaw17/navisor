import { Observable } from 'rxjs/Observable';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../model/User';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userObj: AngularFireObject<User>;
  public user: User;

  public type: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatanase: AngularFireDatabase
  ) {
    if (authService.checkLogin()) {
      const userState = authService.getAuthState();
      this.userObj = angularFireDatanase.object('User/' + userState.uid);
    } else {
      this.router.navigate(['login']);
    }
  }

  gotoCalendar() {}

  gotoEditProfile() {
    this.router.navigate(['profile/edit']);
  }

  ngOnInit() {
    this.user = new User(); // waiting for user
    this.userObj.valueChanges().subscribe(user => {
      this.user = user;
      this.type = user.type === 0 ? 'Traveller' : 'Navigator';
    });
  }
}
