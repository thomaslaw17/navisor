import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Trip } from './../../model/Trip';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class TripService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  getTrips(
    start: BehaviorSubject<string>,
    end: BehaviorSubject<string>
  ): Observable<any[]> {
    return Observable.zip(start, end).switchMap(param => {
      return this.angularFireDatabase
        .list('/Trip', ref =>
          ref
            .orderByChild('name')
            .limitToFirst(10)
            .startAt(param[0])
            .endAt(param[1])
        )
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => {
            return { key: c.payload.key, ...c.payload.val() };
          });
        });
    });
  }
}
