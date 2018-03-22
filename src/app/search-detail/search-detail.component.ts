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
  public place: Place;
  public attraction: Attraction;

  bookNow() {
    this.confirm = true;
  }

  backToDetail() {
    this.confirm = false;
  }

  backToSearch() {
    this.router.navigate(['search']);
  }

  gotoPayment() {
    this.router.navigate(['payment']);
  }

  ngOnInit() {
    this.targetObject = '';
    this.navBarService.showNavbar();
    this.confirm = false;
    this.trip = new Trip();
    this.place = new Place();
    this.attraction = new Attraction();
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
            // trip.events.forEach(event => {
            //   this.trip.events.push(event);
            // });
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
