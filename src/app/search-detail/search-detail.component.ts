import { Message } from './../../model/Message';
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
import { Chat } from '../../model/Chat';
import { DomSanitizer } from '@angular/platform-browser';

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
    public appGlobal: AppGlobal,
    public sanitizer: DomSanitizer
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

  public startDateForm: FormControl;
  public endDateForm: FormControl;

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

  getRoute() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.trip.route);
  }

  makeBooking() {
    if (!this.appGlobal.loggedIn) {
      alert('Please login before booking a trip');
      this.router.navigate(['login']);
      return;
    } else if (
      this.startDateForm.value.getTime() > this.endDateForm.value.getTime()
    ) {
      alert('End date cannot be before Start date');
      return;
    }
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
    this.booking.startDateTime =
      this.startDateForm.value.getFullYear() +
      '-' +
      (this.startDateForm.value.getMonth() + 1) +
      '-' +
      this.startDateForm.value.getDate() +
      ' ' +
      this.trip.startTime +
      ':00';
    this.booking.endDateTime =
      this.endDateForm.value.getFullYear() +
      '-' +
      (this.endDateForm.value.getMonth() + 1) +
      '-' +
      this.endDateForm.value.getDate() +
      ' ' +
      this.trip.endTime +
      ':00';
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
      });
    const chat = new Chat();
    chat.navigatorId = this.booking.navigatorId;
    chat.travellerId = this.booking.travellerId;
    this.angularFireDatabase
      .list<Chat>('Chat')
      .push(chat)
      .then(newChat => {
        this.angularFireDatabase
          .list<string>('User/' + this.booking.navigatorId + '/chats')
          .push(newChat.key);
        this.angularFireDatabase
          .list<string>('User/' + this.booking.travellerId + '/chats')
          .push(newChat.key);

        const message = new Message();
        message.data = 'Hello, how can I help you!';
        message.senderId =
          chat.travellerId === this.appGlobal.userId
            ? chat.navigatorId
            : chat.travellerId;
        message.type = 0;
        this.angularFireDatabase
          .list('Chat/' + newChat.key + '/messages')
          .push(message)
          .then(newMessage => {
            alert('You have successfully booked this trip');
            this.router.navigate(['profile']);
          });
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

    this.startDateForm = new FormControl(new Date());
    this.endDateForm = new FormControl(new Date());

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
