import { Observable } from 'rxjs/Observable';
import { Trip } from './../../model/Trip';
import { Rating } from './../../model/Rating';
import { AppGlobal } from './../app.global';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../model/User';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  public tripRating: Rating;
  public navigatorRating: Rating;

  private tripId: string;
  public trip: Trip;
  private tripObj: Observable<Trip>;

  public navigator: User;

  public vertical: boolean;
  public thumbLabel: boolean;
  public tickInterval: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private angularFireDatabase: AngularFireDatabase,
    private appGlobal: AppGlobal
  ) {}

  rate() {
    this.tripRating.date = new Date().toDateString();
    this.navigatorRating.date = new Date().toDateString();
    this.angularFireDatabase
      .list<Rating>('Trip/' + this.tripId + '/ratings')
      .push(this.tripRating);
    this.angularFireDatabase
      .list<Rating>('User/' + this.trip.navigatorId + '/ratings')
      .push(this.navigatorRating);

    this.router.navigate(['profile']);
  }

  backToProfile() {
    this.router.navigate(['profile']);
  }

  ngOnInit() {
    this.tickInterval = 0.5;
    this.vertical = false;
    this.thumbLabel = true;
    this.navigatorRating.rating = 5;
    this.tripRating.rating = 5;
    this.navigator = new User();
    this.navigatorRating.userId = this.appGlobal.userId;
    this.tripRating.userId = this.appGlobal.userId;
    this.activatedRoute.params.subscribe(params => {
      this.tripObj = this.angularFireDatabase
        .object<Trip>('Trip/' + params.tripId)
        .valueChanges();
      this.tripObj.subscribe(trip => {
        this.trip = trip;
        this.angularFireDatabase
          .object<User>('User/' + trip.navigatorId)
          .valueChanges()
          .subscribe(user => {
            this.navigator = user;
          });
      });
    });
  }
}
