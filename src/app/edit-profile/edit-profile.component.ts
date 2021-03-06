import { User } from './../../model/User';
import { AuthService } from './../services/auth.service';
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
  public user: User;
  public type: string;

  // Reset password part show if true
  public show: boolean;

  public password: string;
  public newPassword: string;
  public newPasswordConfirm: string;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.user = new User();
  }

  saveProfile() {
    this.userObj.set(this.user).then(
      resolve => {
        console.log('Profile updated', resolve);
        this.router.navigate(['profile']);
      },
      reject => {
        console.log('Profile update failed', reject);
      }
    );
  }

  resetPassword() {
    this.authService.resetPassword();
  }

  showResetPassword(show: boolean) {
    this.show = show;
  }

  sendEmailVerification() {
    this.authService.sendEmailVerification();
  }

  ngOnInit() {
    this.user = new User(); // waiting for user
    if (this.authService.checkLogin()) {
      this.authService.getAuthState().subscribe(res => {
        this.userObj = this.angularFireDatabase.object('User/' + res.uid);
        this.userObj.valueChanges().subscribe(user => {
          this.user = user;
          this.type = user.type === 0 ? 'Traveller' : 'Navigator';
        });
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}
