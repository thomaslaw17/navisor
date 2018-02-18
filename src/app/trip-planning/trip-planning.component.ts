import { Place } from './../../model/Place';
import { Trip } from './../../model/Trip';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Event } from './../../model/Event';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-trip-planning',
  templateUrl: './trip-planning.component.html',
  styleUrls: ['./trip-planning.component.css']
})
export class TripPlanningComponent implements OnInit {
  public tripId: string;
  public trip: Trip;

  public placeIds: Array<string>;
  public places: Array<Place>;

  private tripObj: AngularFireObject<Trip>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase
  ) {}

  addEvent() {
    const newEvent = new Event();
    this.trip.events.push(newEvent);
  }

  ngOnInit() {
    if (this.authService.checkLogin) {
      this.route.paramMap.switchMap((params: ParamMap) => {
        this.tripId = params.get('tripId');
        if (this.tripId !== undefined && this.tripId !== null) {
          this.tripObj.valueChanges().subscribe(trip => {
            this.trip = trip;
            this.trip.events.forEach(event => {
              this.placeIds.push(event.placeId);
              const placeRef = this.angularFireDatabase.object<Place>(
                'Place/' + event.placeId
              );
              placeRef.valueChanges().subscribe(place => {
                const pos = this.placeIds
                  .map(function(x) {
                    return x;
                  })
                  .indexOf(event.placeId);
                this.places[pos] = place;
              });
            });
          });
        } else {
          this.trip = new Trip();
        }
        return Observable.of(null);
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}
