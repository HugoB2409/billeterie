import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Event } from '../models/event.model';
import { IRealtimeDatabaseService } from './firebase.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService implements IRealtimeDatabaseService<Event> {
  private _dbPath = '/events';
  private _eventsRef: AngularFireList<Event>;

  constructor(private db: AngularFireDatabase) {
    this._eventsRef = db.list(this._dbPath);
  }

  public getAll(): Observable<Event[]> {
    return this._eventsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  public get(key: string): Observable<Event> {
    return this.db
      .object(this._dbPath + '/' + key)
      .snapshotChanges()
      .pipe(
        take(1),
        map((action) => {
          const key = action.key;
          const val = action.payload.val();
          return { key, ...(val as Event) };
        })
      );
  }

  public create(event: Event): any {
    return this._eventsRef.push(event);
  }

  public update(key: string, value: any): Promise<void> {
    return this._eventsRef.update(key, value);
  }

  public delete(key: string): Promise<void> {
    return this._eventsRef.remove(key);
  }
}
