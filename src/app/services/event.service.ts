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
  private dbPath = '/events';

  eventsRef: AngularFireList<Event>;

  constructor(private db: AngularFireDatabase) {
    this.eventsRef = db.list(this.dbPath);
  }

  getAll(): Observable<Event[]> {
    return this.eventsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(key: string): Observable<Event> {
    return this.db
      .object(this.dbPath + '/' + key)
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

  create(event: Event): any {
    return this.eventsRef.push(event);
  }

  update(key: string, value: any): Promise<void> {
    return this.eventsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.eventsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.eventsRef.remove();
  }
}
