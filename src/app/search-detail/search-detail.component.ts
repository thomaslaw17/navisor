import { Booking } from './../../model/Booking';
import { UtilService } from './../services/util.service';
import { Attraction } from './../../model/Attraction';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { NavBarService } from './../services/nav-bar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { AppGlobal } from '../app.global';
import { Trip } from '../../model/Trip';
import { Event } from './../../model/Event';
import { Place } from './../../model/Place';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.css']
})
export class SearchDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService,
    private util: UtilService,
    public appGlobal: AppGlobal
  ) {}

  private id: string;
  public targetObject: string;
  private obj: AngularFireObject<any>;
  public confirm: boolean;
  public trip: Trip;
  // public events: Array<Event[]>;
  public events: Array<Event>;
  public place: Place;
  public attraction: Attraction;

  public booking: Booking;

  public startDate: string;
  public endDate: string;

  public date = new FormControl(new Date());
  public serializedDate = new FormControl((new Date()).toISOString());

  gotoBookNow() {
    this.confirm = true;
    document.getElementById('bookNow').scrollIntoView();
  }

  backToDetail() {
    this.confirm = false;
  }

  backToSearch() {
    this.router.navigate(['search']);
  }

  makeBooking() {
    if (this.startDate === '' || this.endDate === '') {
      alert('Please input start date and end date');
      return;
    }
    this.booking.startDateTime =
      this.startDate + 'T' + this.trip.startTime + ':00Z';
    this.booking.endDateTime = this.endDate + 'T' + this.trip.endTime + ':00Z';
    this.booking.status = 0;
    this.angularFireDatabase
      .list<Booking>('Booking')
      .push(this.booking)
      .then(booking => {
        this.angularFireDatabase
          .list('User/' + this.booking.navigatorId + '/bookings')
          .push(booking.key);
        this.angularFireDatabase
          .list('User/' + this.booking.travellerId + '/bookings')
          .push(booking.key);
        this.router.navigate(['payment']);
      });
  }

  ngOnInit() {
    this.targetObject = '';
    this.startDate = '';
    this.endDate = '';
    // this.events = new Array<Event[]>();
    this.events = new Array<Event>();
    this.navBarService.showNavbar();
    this.confirm = false;
    this.trip = new Trip();
    this.place = new Place();
    this.attraction = new Attraction();
    this.booking = new Booking();

    this.activatedRouter.params.subscribe(params => {
      this.id = params.id;
      switch (params.obj) {
        case 'trip':
        case 'Trip':
          this.targetObject = 'Trip';
          this.obj = this.angularFireDatabase.object<Trip>(
            this.targetObject + '/' + this.id
          );
          this.obj.valueChanges().subscribe(tripObj => {
            this.trip = tripObj;
            const events = new Array<Event>();
            for (const id in tripObj.events) {
              if (id !== '') {
                events.push(tripObj.events[id]);
              }
            }
            this.trip.events = events;
            for (let i = 0; i < events.length; i++) {
              this.events.push(events[i]);
            }
          });

          if (this.appGlobal.userType === 0) {
            this.booking.travellerId = this.appGlobal.userId;
            this.booking.navigatorId = this.trip.navigatorId;
          } else {
            this.booking.travellerId = this.trip.travellerId;
            this.booking.navigatorId = this.appGlobal.userId;
          }
          this.booking.name = this.trip.name;
          this.booking.price = this.trip.price;
          this.booking.tripId = this.id;
          break;
        case 'place':
        case 'Place':
          this.targetObject = 'Place';
          this.obj = this.angularFireDatabase.object<Place>(
            this.targetObject + '/' + this.id
          );
          this.obj.valueChanges().subscribe(place => {
            this.place = place;
          });
          break;
        case 'attraction':
        case 'Attraction':
          this.targetObject = 'Attraction';
          this.obj = this.angularFireDatabase.object<Attraction>(
            this.targetObject + '/' + this.id
          );
          this.obj.valueChanges().subscribe(attraction => {
            this.attraction = attraction;
          });
          break;
        default:
          return;
      }
    });
  }
}

@Component({
  selector: 'app-search-event-item',
  templateUrl: './search-event-item.component.html',
  styleUrls: ['./search-event-item.component.css']
})
export class SearchEventItemComponent implements OnInit {
  @Input() attractionId: string;
  @Input() startTime: Date;
  @Input() endTime: Date;

  private attractionObj: Observable<Attraction>;
  public attraction: Attraction;

  constructor(private angularFireDatabase: AngularFireDatabase) {}

  ngOnInit() {
    this.attraction = new Attraction();
    this.attractionObj = this.angularFireDatabase
      .object<Attraction>('Attraction/' + this.attractionId)
      .valueChanges();
    this.attractionObj.subscribe(attraction => {
      this.attraction = attraction;
    });
  }
}
