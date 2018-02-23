import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatanase: AngularFireDatabase
  ) {}

  search() {
    this.show = true; // temp
    // query from database
    // this.keyword, this.catagory
  }

  ngOnInit() {
    this.show = false;
    this.catagories = ['cat 1', 'cat 2', 'cat 3'];
  }
}
