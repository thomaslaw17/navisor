import { AppGlobal } from './../app.global';
import { NavBarService } from './../nav-bar.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-trip',
  templateUrl: './custom-trip.component.html',
  styleUrls: ['./custom-trip.component.css']
})
export class CustomTripComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService,
    public appGlobal: AppGlobal
  ) {}

  ngOnInit() {
    this.navBarService.showNavbar();
  }
}
