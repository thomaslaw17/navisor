import { FormControl } from '@angular/forms';
import { Booking } from './../../model/Booking';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AttractionService } from './../services/attraction.service';
import { Attraction } from './../../model/Attraction';
import { UtilService } from './../services/util.service';
import { Trip } from './../../model/Trip';
import { Observable } from 'rxjs/Observable';
import { AppGlobal } from './../app.global';
import { NavBarService } from './../services/nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Event } from '../../model/Event';
import { User } from 'firebase/app';

@Component({
  selector: 'app-custom-trip',
  templateUrl: './custom-trip.component.html',
  styleUrls: ['./custom-trip.component.css']
})
export class CustomTripComponent implements OnInit {
  public tripId: String;
  private tripObj: Observable<Trip>;
  public trip: Trip;

  public startDateForm: FormControl;
  public endDateForm: FormControl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService,
    private util: UtilService,
    public appGlobal: AppGlobal
  ) {}

  submitTrip() {
    let msg = 'Please input ';
    if (
      this.trip.name === undefined ||
      this.trip.name === null ||
      this.trip.name === ''
    ) {
      msg += 'Destination ';
    }
    if (
      this.trip.catagory === undefined ||
      this.trip.catagory === null ||
      this.trip.catagory === ''
    ) {
      msg += 'Catagory ';
    }

    if (
      this.trip.numberOfTravellers === undefined ||
      this.trip.numberOfTravellers === null ||
      this.trip.numberOfTravellers === 0
    ) {
      msg += 'Number of Travellers ';
    }

    if (
      this.trip.duration === undefined ||
      this.trip.duration === null ||
      this.trip.duration === 0
    ) {
      msg += 'Duration ';
    }

    if (
      this.trip.price === undefined ||
      this.trip.price === null ||
      this.trip.price === 0
    ) {
      msg += 'Budget ';
    }

    if (
      this.trip.events === undefined ||
      this.trip.events === null ||
      this.trip.events.length === 0
    ) {
      msg += 'Catagory ';
    }

    if (!this.startDateForm.valid || !this.endDateForm.valid) {
      msg += 'Date';
    }

    if (msg !== 'Please input ') {
      alert(msg);
      return;
    } else {
      if (this.trip.events.length < 2) {
        alert('Please at least have one event in your trip!');
      }
      this.trip.startTime = this.trip.events[0].startTime;
      this.trip.endTime = this.trip.events[this.trip.events.length - 1].endTime;
      this.trip.status = 0;
      this.angularFireDatabase
        .list('Trip')
        .push(this.trip)
        .then(newTrip => {
          const booking = new Booking();
          booking.navigatorId = '';
          booking.travellerId = this.appGlobal.userId;
          booking.name = this.trip.name;
          booking.price = this.trip.price;
          booking.startDateTime =
            this.startDateForm.value.getFullYear() +
            '-' +
            (this.startDateForm.value.getMonth() + 1) +
            '-' +
            this.startDateForm.value.getDate() +
            ' ' +
            this.trip.startTime +
            ':00';
          booking.endDateTime =
            this.endDateForm.value.getFullYear() +
            '-' +
            (this.endDateForm.value.getMonth() + 1) +
            '-' +
            this.endDateForm.value.getDate() +
            ' ' +
            this.trip.endTime +
            ':00';
          booking.status = 0;
          booking.tripId = newTrip.key;
          this.angularFireDatabase
            .list('Booking')
            .push(booking)
            .then(newBooking => {
              this.angularFireDatabase
                .list('User/' + this.appGlobal.userId + '/bookings')
                .push(newBooking.key);
              this.router.navigate(['profile']);
            });
        });
    }
  }

  addEvent() {
    this.trip.events.push(new Event());
  }

  backToSearch() {
    this.router.navigate(['search']);
  }

  updateEvent($event) {
    console.log($event);
  }

  ngOnInit() {
    if (!this.appGlobal.loggedIn) {
      alert('Please login before using this function');
      this.router.navigate(['login']);
      return;
    }
    this.trip = new Trip();
    this.activatedRoute.params.subscribe(params => {
      this.tripId = params.tripId;
      if (this.tripId === 'new') {
        this.trip.events = new Array();
        this.trip.events.push(new Event());
      } else {
        this.tripObj = this.angularFireDatabase
          .object<Trip>('Trip/' + this.tripId)
          .valueChanges();
        this.tripObj.subscribe(trip => {
          if (trip !== undefined && trip !== null) {
            this.trip = trip;
            this.trip.events = this.util.objectToArray(trip.events);
          } else {
            this.trip.events = new Array();
            this.trip.events.push(new Event());
          }
        });
      }
    });
    this.navBarService.showNavbar();
  }
}

@Component({
  selector: 'app-custom-event',
  templateUrl: './custom-event.component.html',
  styleUrls: ['./custom-event.component.css']
})
export class CustomEventComponent implements OnInit {
  @Input() tripId: string;
  @Input() event: Event;

  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();

  private eventObj: Observable<Event>;
  private attractionObj: Observable<Attraction>;
  public attraction: Attraction;

  public attractions: Array<any>;
  private startAt: BehaviorSubject<string> = new BehaviorSubject('');
  private endAt: BehaviorSubject<string> = new BehaviorSubject('\uf8ff');
  private lastKeyPress: number;

  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private attractionService: AttractionService
  ) {}

  search($event) {
    if ($event.timeStamp - this.lastKeyPress > 200) {
      const q = $event.target.value;
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
    }
    this.lastKeyPress = $event.timeStamp;

    // this.startAt.next(q);
    // this.endAt.next(q + '\uf8ff');
  }

  updateEvent() {
    this.change.emit(this.event);
  }

  ngOnInit() {
    this.attraction = new Attraction();
    if (
      this.event.attractionId !== undefined &&
      this.event.attractionId !== null &&
      this.event.attractionId !== ''
    ) {
      this.attractionObj = this.angularFireDatabase
        .object<Attraction>('Attraction/' + this.event.attractionId)
        .valueChanges();
      this.attractionObj.subscribe(attraction => {
        if (attraction !== undefined && attraction !== null) {
          this.attraction = attraction;
          console.log(attraction);
        }
      });
    } else {
      this.attractionService.getAllAttractions().subscribe(attractions => {
        this.attractions = attractions;
      });
    }

    // this.attractionService
    //   .getAttractions(this.startAt, this.endAt)
    //   .subscribe(attractions => {
    //     this.attractions = attractions;
    //   });
  }
}
