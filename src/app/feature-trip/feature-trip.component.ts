import { NavBarService } from './../services/nav-bar.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-feature-trip',
  templateUrl: './feature-trip.component.html',
  styleUrls: ['./feature-trip.component.css']
})
export class FeatureTripComponent implements OnInit {
  constructor(
    private angularFireDatabase: AngularFireDatabase,
    private navBarService: NavBarService
  ) {}

  ngOnInit() {}
}
