import { NavBarService } from './../nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../app.global';

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

  public results: Array<Event>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatanase: AngularFireDatabase,
    private navBarSerive: NavBarService,
    public appGlobal: AppGlobal
  ) {}

  search() {
    this.show = true; // temp
    // query from database
    // this.keyword, this.catagory
  }

  searchDetail(id) {
    this.router.navigate(['search/detail/' + id]);
  }

  ngOnInit() {
    this.navBarSerive.showNavbar();
    this.show = false;
    this.catagories = ['cat 1', 'cat 2', 'cat 3'];
  }
}
