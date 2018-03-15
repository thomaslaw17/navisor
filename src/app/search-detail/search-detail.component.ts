import { Event } from './../../model/Event';
import { Place } from './../../model/Place';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { NavBarService } from './../nav-bar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../app.global';
import { Trip } from '../../model/Trip';

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
    public appGlobal: AppGlobal
  ) {}

  private id: string;
  private obj: AngularFireObject<any>;
  public confirm: boolean;
  public trip: Trip;
  public events: Array<{
    event: Event;
    place: Place;
  }>;

  bookNow() {
    this.confirm = true;
  }

  backToDetail() {
    this.confirm = false;
  }

  backToSearch() {
    this.router.navigate(['search']);
  }

  ngOnInit() {
    this.navBarService.showNavbar();
    this.confirm = false;
    this.activatedRouter.params.subscribe(params => {
      this.id = params.id;
      this.obj = this.angularFireDatabase.object(params.obj + '/' + this.id);
      this.obj.valueChanges().subscribe(trip => {
        this.trip = trip;
        trip.events.forEach(event => {
          const obj = this.angularFireDatabase
            .object<Place>('place/' + event.placeId)
            .valueChanges();
          obj.subscribe(place => {
            this.events.push({
              event: event,
              place: place
            });
          });
        });
      });
    });
  }
}
