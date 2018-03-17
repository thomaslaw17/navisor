import { UtilService } from './../util.service';
import { Trip } from './../../model/Trip';
import { Observable } from 'rxjs/Observable';
import { AppGlobal } from './../app.global';
import { NavBarService } from './../nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

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

  ngOnInit() {
    this.trip = new Trip();
    this.activatedRoute.params.subscribe(params => {
      this.tripId = params.tripId;
      this.tripObj = this.angularFireDatabase
        .object<Trip>('Trip/' + this.tripId)
        .valueChanges();
      this.tripObj.subscribe(trip => {
        if (trip !== undefined || trip != null) {
          this.trip = trip;
          this.trip.events = this.util.objectToArray(trip.events);
        }
      });
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
  @Input() eventId: string;

  private eventObj: Observable<Event>;
  private event: Event;

  constructor(private angularFireDatabase: AngularFireDatabase) {}

  ngOnInit(): void {
    this.eventObj = this.angularFireDatabase
      .object<Event>('Trip/' + this.tripId + '/events/' + this.eventId)
      .valueChanges();
  }
}
