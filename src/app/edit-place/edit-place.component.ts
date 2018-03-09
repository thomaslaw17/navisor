import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Place } from './../../model/Place';
import { NavBarService } from './../nav-bar.service';
import { AppGlobal } from './../app.global';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {
  public placeId: string;
  public placeObj: Observable<Place>;
  public places: AngularFireList<Place>;
  public place: Place;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public appGlobal: AppGlobal,
    private navBarService: NavBarService,
    private angularFireDatabase: AngularFireDatabase
  ) {
    this.places = angularFireDatabase.list<Place>('Place');
  }

  update() {
    if (this.placeId !== 'new') {
      this.places.update(this.placeId, this.place);
    } else {
      this.places.push(this.place);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id !== 'new') {
        this.placeId = params.id;
        this.place = new Place();
      } else {
        this.placeObj = new Observable<Place>();
        this.placeObj.subscribe(place => {
          this.place = place;
        });
      }
    });
  }
}
