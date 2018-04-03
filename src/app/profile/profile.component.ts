import { UtilService } from './../services/util.service';
import { Event } from './../../model/Event';
import { Trip } from './../../model/Trip';
import { Booking } from './../../model/Booking';
import { Observable } from 'rxjs/Observable';
import {
  AngularFireObject,
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
import { User } from './../../model/User';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavBarService } from '../services/nav-bar.service';
import { AppGlobal } from '../app.global';
import {
  AngularFireStorageReference,
  AngularFireStorage
} from 'angularfire2/storage';
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
            if (user.type === 0) {
              this.type = 'Traveller';
            } else {
              this.type = 'Navigator';
            }
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
    private appGlobal: AppGlobal,
    private angularFireStorage: AngularFireStorage
  ) {}

  updateProfile() {
    this.angularFireDatabase
      .list('User')
      .update(this.appGlobal.userId, this.user);
    // .push(this.user);
  }

  uploadPhoto(event) {
    const file = event.srcElement.files[0];
    const url = this.angularFireStorage
      .upload('user/' + this.appGlobal.userId, file)
      .downloadURL()
      .subscribe(downloadUrl => {
        this.angularFireDatabase
          .object('User/' + this.appGlobal.userId)
          .update({ photoUrl: downloadUrl });
      });
    alert('Profile picture uploaded');
  }

  openInputFile() {
    document.getElementById('uploadPhoto').click();
  }

  ngOnInit() {}
}

@Component({
  selector: 'app-profile-past-event',
  templateUrl: './profile-pastEvent.component.html',
  styleUrls: ['./profile-pastEvent.component.css']
})
export class ProfilePastEventComponent implements OnInit {
  @Input() user: User;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.user.bookings = this.util.objectToArray(this.user.bookings);
  }
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
  public bookingList: Observable<Booking[]>;
  public events: Array<Event>;

  constructor(
    private router: Router,
    private angularFireDatebase: AngularFireDatabase,
    private appGlobal: AppGlobal
  ) {}

  ngOnInit() {
    this.events = new Array<Event>();
    this.bookingList = this.angularFireDatebase
      .list<Booking>(this.appGlobal.userId + '/Booking')
      .valueChanges();
    this.bookingList.subscribe(bookings => {
      bookings.forEach(booking => {
        this.angularFireDatebase
          .object<Trip>('Trip/' + booking.tripId)
          .valueChanges()
          .subscribe(trip => {
            trip.events.forEach(event => {
              this.events.push(event);
            });
          });
      });
    });
  }
}

@Component({
  selector: 'app-profile-event',
  templateUrl: './profile-event.component.html',
  styleUrls: ['./profile-event.component.css']
})
export class ProfileEventComponent implements OnInit {
  @Input() bookingId: string;

  public booking: Booking;

  public trip: Trip;
  public status: string;

  private bookingObj: Observable<Booking>;
  private tripObj: Observable<Trip>;

  constructor(
    private router: Router,
    private angularFireDatabase: AngularFireDatabase
  ) {}

  gotoTripDetail() {
    this.router.navigate(['search/detail/trip/' + this.booking.tripId]);
  }

  ngOnInit() {
    this.booking = new Booking();
    this.trip = new Trip();

    this.bookingObj = this.angularFireDatabase
      .object<Booking>('Booking/' + this.bookingId)
      .valueChanges();
    this.bookingObj.subscribe(booking => {
      this.booking = booking;
      this.tripObj = this.angularFireDatabase
        .object<Trip>('Trip/' + booking.tripId)
        .valueChanges();
      this.tripObj.subscribe(trip => {
        if (this.trip !== undefined && this.trip !== null) {
          this.trip = trip;
          switch (this.trip.status) {
            case 0:
              this.status = 'Pending';
              break;
            case 1:
              this.status = 'Approved';
              break;
            case 2:
              this.status = 'Finished';
              break;
            case 9:
              this.status = 'Rejected';
              break;
            default:
          }
        }
      });
    });
  }
}

@Component({
  selector: 'app-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.css']
})
export class ProfileLanguageComponent implements OnInit {
  @Input() user: User;

  public choice: string;

  constructor(
    private router: Router,
    private appGlobal: AppGlobal,
    private angularFireDatabase: AngularFireDatabase
  ) {}

  changeLanguage() {
    this.angularFireDatabase
      .object<User>('User/' + this.appGlobal.userId)
      .update({ language: this.user.language });
  }

  ngOnInit() {}
}
