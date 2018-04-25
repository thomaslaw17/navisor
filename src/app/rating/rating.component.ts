import { Observable } from 'rxjs/Observable';
import { Trip } from './../../model/Trip';
import { Rating } from './../../model/Rating';
import { AppGlobal } from './../app.global';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  public rating: Rating;

  private tripId: string;
  public trip: Trip;
  private tripObj: Observable<Trip>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private angularFireDatabase: AngularFireDatabase,
    private appGlobal: AppGlobal
  ) {}

  rate() {
    this.angularFireDatabase
      .list<Rating>('Trip/' + this.tripId + '/rating')
      .push(this.rating);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.tripObj = this.angularFireDatabase
        .object<Trip>('Trip/' + params.tripId)
        .valueChanges();
      this.tripObj.subscribe(trip => {
        this.trip = trip;
      });
    });
  }
}
