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

  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatanase: AngularFireDatabase
  ) {}

  ngOnInit() {}
}
