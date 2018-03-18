import { Observable } from 'rxjs/Observable';
import { Trip } from './../model/Trip';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class TripService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  getTrips(start, end): Observable<Trip[]> {
    return this.angularFireDatabase
      .list<Trip>('/Trip', ref =>
        ref
          .orderByChild('name')
          .limitToFirst(10)
          .startAt(start)
          .endAt(end)
      )
      .valueChanges();
  }
}
