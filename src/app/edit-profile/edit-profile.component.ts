import { User } from './../../model/User';
import { AuthService } from './../auth.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public userObj: AngularFireObject<User>;

  public name: string;
  public birthday: Date;
  public email: string;
  public type: string;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {
    if (authService.checkLogin()) {
      const userState = authService.getAuthState();
      this.userObj = angularFireDatabase.object('User/' + userState.uid);
    } else {
      router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.userObj.valueChanges().subscribe(user => {
      this.name = user.name;
      this.birthday = user.birthday;
      this.email = user.email;
      this.type = user.type === 0 ? 'Traveller' : 'Navigator';
    });
  }
}
