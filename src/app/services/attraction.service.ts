import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/switchMap';
import { Attraction } from './../../model/Attraction';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class AttractionService {
  constructor(private angularFireDatabase: AngularFireDatabase) {}

  getAttractions(
    start: BehaviorSubject<string>,
    end: BehaviorSubject<string>
  ): Observable<any[]> {
    // return this.angularFireDatabse.list<Attraction>('Attraction', {
    //   query: {
    //     orderByChild: 'name'
    //   }
    // })
    return Observable.zip(start, end).switchMap(param => {
      return this.angularFireDatabase
        .list('/Attraction', ref =>
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

  getAllAttractions(): Observable<any[]> {
    return this.angularFireDatabase
      .list<any>('Attraction')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          key: action.key,
          ...action.payload.val()
        }));
      });
  }
}
