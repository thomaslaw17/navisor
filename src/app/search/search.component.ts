import { NavBarService } from './../nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
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

  public show: boolean;

  public results: Result[][];

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService,
    public appGlobal: AppGlobal
  ) {}

  search() {
    this.show = true; // temp
    // query from database
    // this.keyword, this.catagory
  }

  ngOnInit() {
    this.navBarService.showNavbar();
    this.show = false;
    this.catagories = ['cat 1', 'cat 2', 'cat 3'];

    // testing
    this.results = new Array<Result[]>();
    for (let i = 0; i < 6 / 3; i++) {
      const row: Result[] = new Array<Result>();
      for (let j = 0; j < 3; j++) {
        row.push({
          id: '1',
          name: 'Nunc in felis aliquet metus luctus iaculis',
          detail:
            'Aliquam ac lacus volutpat, dictum risus at, scelerisque nulla. Nullam sollicitudin at augue venenatis eleifend.' +
            'Nulla ligula ligula, egestas sit amet viverra id, iaculis sit amet ligula.',
          photo: '/img/1/',
          type: 'event'
        });
      }
      this.results.push(row);
    }
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
    this.router.navigate(['search/detail/Trip/tripID']);
  }

  ngOnInit() {}
}
