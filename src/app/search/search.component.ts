import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TripService } from './../services/trip.service';
import { NavBarService } from './../services/nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Input,
  ElementRef,
  HostListener
} from '@angular/core';
import { AppGlobal } from '../app.global';
import { Result } from '../../model/Result';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
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
  public results: Array<Result[]>;

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
    this.angularFireDatabase
      .list('Trip', ref =>
        ref
          .orderByChild('name')
          .startAt('\u0000' + this.appGlobal.search.location)
          .endAt(this.appGlobal.search.location + '\uf8ff')
      )
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          key: action.key,
          ...action.payload.val()
        }));
      })
      .subscribe(trips => {
        this.results = new Array<Result[]>();
        let count = 0;
        for (let i = 0; i <= trips.length / 3; i++) {
          const row: Result[] = new Array<Result>();
          for (let j = 0; j < 3 && count < trips.length; j++) {
            let done = false;
            while (!done) {
              if (count >= trips.length) {
                done = true;
              } else if (
                (!this.appGlobal.searchFilter.themeFilter.culturalheritage &&
                  trips[count].catagory === 'culturalheritage') ||
                (!this.appGlobal.searchFilter.themeFilter.nature &&
                  trips[count].catagory === 'nature') ||
                (!this.appGlobal.searchFilter.themeFilter.foodie &&
                  trips[count].catagory === 'foodie') ||
                (!this.appGlobal.searchFilter.themeFilter.photography &&
                  trips[count].catagory === 'photography') ||
                (!this.appGlobal.searchFilter.themeFilter.others &&
                  trips[count].catagory === 'others')
              ) {
                count++;
              } else if (
                (this.appGlobal.searchFilter.budgetFilter['0'] &&
                  trips[count].budget >= 500 &&
                  trips[count].bueget < 1000) ||
                (this.appGlobal.searchFilter.budgetFilter['1'] &&
                  trips[count].budget >= 1000 &&
                  trips[count].budget < 1500) ||
                (this.appGlobal.searchFilter.budgetFilter['2'] &&
                  trips[count].budget >= 1500 &&
                  trips[count].budget < 2000) ||
                (this.appGlobal.searchFilter.budgetFilter['3'] &&
                  trips[count].budget >= 2000)
              ) {
                count++;
              } else {
                row.push({
                  id: trips[3 * i + j].key,
                  name: trips[3 * i + j].name,
                  detail:
                    trips[3 * i + j].description.length > 150
                      ? trips[3 * i + j].description.substring(0, 150) + '...'
                      : trips[3 * i + j].description,
                  photo: trips[3 * i + j].photoUrl,
                  type: 'trip'
                });
                count++;
                done = true;
              }
            }
          }

          this.results.push(row);
        }
      });
  }

  updateSearch($event) {
    const q = $event.target.value;
    this.appGlobal.search.startAt.next(q);
    this.appGlobal.search.endAt.next(q + '\uf8ff');
  }

  scrollTo(el) {
    el.scrollIntoView();
  }

  scrollToSerach() {
    document.getElementById('searchResult').scrollIntoView();
  }

  gotoCustomTrip() {
    this.router.navigate(['customTrip/new']);
  }

  ngOnInit() {
    this.navBarService.showNavbar();
    this.show = false;
    this.catagories = ['cat 1', 'cat 2', 'cat 3'];
    this.search();
  }
}

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state(
        'show',
        style({
          opacity: 1,
          transform: 'translateY(0) translateX(0) rotateX(0) rotateY(0)'
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
          transform:
            'translateY(100%) translateX(100%) rotateX(90deg) rotateY(90deg)'
        })
      ),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class SearchResultComponent implements OnInit {
  @Input() result: Result;

  public state: string;

  constructor(private router: Router, public elementRef: ElementRef) {
    this.state = 'hide';
  }
  searchDetail(type, id) {
    this.router.navigate(['search/detail/' + type + '/' + id]);
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.elementRef.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }
  }

  ngOnInit() {}
}
