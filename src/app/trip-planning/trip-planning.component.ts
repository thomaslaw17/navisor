import { AppGlobal } from './../app.global';
import { Attraction } from './../../model/Attraction';
import { Trip } from './../../model/Trip';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
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

  public attractionIds: Array<string>;
  public attractions: Array<Attraction>;

  private tripObj: AngularFireObject<Trip>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private appGlobal: AppGlobal
  ) {}

  addEvent(): void {
    const newEvent = new Event();
    this.trip.events.push(newEvent);
  }

  gotoTripPlanning(section) {
    this.appGlobal.searchFilter.themeFilter.culturalheritage = false;
    this.appGlobal.searchFilter.themeFilter.nature = false;
    this.appGlobal.searchFilter.themeFilter.foodie = false;
    this.appGlobal.searchFilter.themeFilter.photography = false;
    this.appGlobal.searchFilter.themeFilter.university = false;
    this.appGlobal.searchFilter.themeFilter.others = false;

    switch (section) {
      case 'Cultural&Heritage':
        this.appGlobal.searchFilter.themeFilter.culturalheritage = true;
        break;
      case 'Nature':
        this.appGlobal.searchFilter.themeFilter.nature = true;
        break;
      case 'Foodie':
        this.appGlobal.searchFilter.themeFilter.foodie = true;
        break;
      case 'Photography':
        this.appGlobal.searchFilter.themeFilter.photography = true;
        break;
      case 'University':
        this.appGlobal.searchFilter.themeFilter.university = true;
        break;
      default:
        break;
    }
    this.router.navigate(['search']);
  }

  ngOnInit(): void {
    if (this.authService.checkLogin) {
      this.trip = new Trip();
      this.route.paramMap.switchMap((params: ParamMap) => {
        this.tripId = params.get('tripId');
        if (this.tripId !== undefined && this.tripId !== null) {
          this.tripObj.valueChanges().subscribe(trip => {
            this.trip = trip;
            this.trip.events.forEach(event => {
              this.attractionIds.push(event.attractionId);
              const attractionRef = this.angularFireDatabase.object<Attraction>(
                'Attraction/' + event.attractionId
              );
              attractionRef.valueChanges().subscribe(attraction => {
                const pos = this.attractionIds
                  .map(function(x) {
                    return x;
                  })
                  .indexOf(event.attractionId);
                this.attractions[pos] = attraction;
              });
            });
          });
        }
        return Observable.of(null);
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}
