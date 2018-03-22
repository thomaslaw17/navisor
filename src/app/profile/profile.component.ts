import { Observable } from 'rxjs/Observable';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { User } from './../../model/User';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavBarService } from '../services/nav-bar.service';
import { AppGlobal } from '../app.global';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userObj: AngularFireObject<User>;
  public user: User;
  public tab: string;
  public type: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService,
    private appGlobal: AppGlobal
  ) {
    // if (authService.checkLogin()) {
    //   const userState = authService.getAuthState();
    //   this.userObj = angularFireDatabase.object('User/' + userState.uid);
    // } else {
    //   this.router.navigate(['login']);
    // }
  }

  switchTab(name) {
    this.tab = name;
  }

  ngOnInit() {
    this.user = new User(); // waiting for user
    this.tab = 'edit';
    this.navBarService.showNavbar();
    this.authService.getAuthState().subscribe(res => {
      if (res !== undefined || res !== null) {
        this.userObj = this.angularFireDatabase.object<User>(
          'User/' + this.appGlobal.userId
        );
        this.userObj.valueChanges().subscribe(user => {
          if (user !== undefined && user !== null) {
            this.user = user;
            this.type = user.type === 0 ? 'Traveller' : 'Navigator';
          } else {
            this.router.navigate(['login']);
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @Input() user: User;
  private userObj: Observable<User>;
  private userId: string;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private authService: AuthService,
    private appGlobal: AppGlobal
  ) {}

  updateProfile() {
    this.angularFireDatabase
      .list('User')
      .update(this.appGlobal.userId, this.user);
    // .push(this.user);
  }

  ngOnInit() {
    console.log(this.user);
  }
}

@Component({
  selector: 'app-profile-past-event',
  templateUrl: './profile-pastEvent.component.html',
  styleUrls: ['./profile-pastEvent.component.css']
})
export class ProfilePastEventComponent implements OnInit {
  @Input() user: User;
  constructor(private router: Router) {}
  ngOnInit() {}
}

@Component({
  selector: 'app-profile-payment-method',
  templateUrl: './profile-paymentMethod.component.html',
  styleUrls: ['./profile-paymentMethod.component.css']
})
export class ProfilePaymentMethodComponent implements OnInit {
  @Input() user: User;
  constructor(private router: Router) {}
  ngOnInit() {}
}

@Component({
  selector: 'app-profile-reward-points',
  templateUrl: './profile-rewardPoints.component.html',
  styleUrls: ['./profile-rewardPoints.component.css']
})
export class ProfileRewardPointsComponent implements OnInit {
  @Input() user: User;
  constructor(private router: Router) {}
  ngOnInit() {}
}

@Component({
  selector: 'app-profile-schedule',
  templateUrl: './profile-schedule.component.html',
  styleUrls: ['./profile-schedule.component.css']
})
export class ProfileScheduleComponent implements OnInit {
  @Input() user: User;
  constructor(private router: Router) {}
  ngOnInit() {}
}
