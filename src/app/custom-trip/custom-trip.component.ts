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

@Component({
  selector: 'app-custom-trip',
  templateUrl: './custom-trip.component.html',
  styleUrls: ['./custom-trip.component.css']
})
export class CustomTripComponent implements OnInit {
  public tripId: String;
  private tripObj: Observable<Trip>;
  public trip: Trip;

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
      this.trip.price === ''
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

    if (msg === 'Please input ') {
      alert(msg);
      return;
    } else {
      this.angularFireDatabase.list('Trip').push(this.trip);
    }
  }

  addEvent() {
    this.trip.events.push(new Event());
  }

  ngOnInit() {
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

  private eventObj: Observable<Event>;
  private attractionObj: Observable<Attraction>;
  public attraction: Attraction;

  public attractions: Array<any>;
  private startAt: BehaviorSubject<string | null> = new BehaviorSubject('');
  private endAt: BehaviorSubject<string | null> = new BehaviorSubject('\uf8ff');
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

  ngOnInit() {
    this.attraction = new Attraction();
    this.attractionObj = this.angularFireDatabase
      .object<Attraction>('Attraction/' + this.event.attractionId)
      .valueChanges();
    this.attractionObj.subscribe(attraction => {
      if (attraction !== undefined && attraction !== null) {
        this.attraction = attraction;
        console.log(attraction);
      }
    });
    this.attractionService
      .getAttractions(this.startAt, this.endAt)
      .subscribe(attractions => {
        this.attractions = attractions;
      });
  }
}
