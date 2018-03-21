import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TripService } from './../services/trip.service';
import { NavBarService } from './../services/nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AppGlobal } from '../app.global';
import { Result } from '../../model/Result';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public keyword: string;
  public selected: string;
  public catagory: string;
  public catagories: Array<string>;
  public lastKeyPress: number;
  public show: boolean;
  public results: Array<Result[]>; // public results: Result[][];
  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService,
    public appGlobal: AppGlobal,
    private tripService: TripService
  ) {}
  search() {
    this.show = true; // temp
    // query from database
    // this.keyword, this.catagory
  }
  updateSearch($event) {
    if ($event.timeStamp - this.lastKeyPress > 200) {
      const q = $event.target.value;
      this.appGlobal.search.startAt.next(q);
      this.appGlobal.search.endAt.next(q + '\uf8ff');
    }
    this.lastKeyPress = $event.timeStamp;
  }
  ngOnInit() {
    this.navBarService.showNavbar();
    this.show = false;
    this.catagories = ['cat 1', 'cat 2', 'cat 3'];
    this.tripService
      .getTrips(this.appGlobal.search.startAt, this.appGlobal.search.endAt)
      .subscribe(trips => {
        this.results = new Array<Result[]>();
        for (let i = 0; i < trips.length / 3; i++) {
          const row: Result[] = new Array<Result>();
          for (let j = 0; j < 3 && i < trips.length; j++, i++) {
            row.push({
              id: trips[i].key,
              name: trips[i].name,
              detail: trips[i].description,
              photo: trips[i].url,
              type: 'trip'
            });
          }
          this.results.push(row);
        }
      });
  }
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: Result;
  constructor(private router: Router) {}
  searchDetail(type, id) {
    // this.router.navigate(['search/detail/' + id]);
    this.router.navigate(['search/detail/' + type + '/' + id]);
  }
  ngOnInit() {}
}
