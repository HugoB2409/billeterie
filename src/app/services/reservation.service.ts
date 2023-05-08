import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Reservation } from '../models/reservation.model';
import { IRealtimeDatabaseService } from './firebase.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService
  implements IRealtimeDatabaseService<Reservation>
{
  private dbPath = '/reservations';

  reservationsRef: AngularFireList<Reservation>;

  constructor(private db: AngularFireDatabase) {
    this.reservationsRef = db.list(this.dbPath);
  }

  getAll(): Observable<Reservation[]> {
    return this.reservationsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(key: string): Observable<Reservation> {
    return this.db
      .object(this.dbPath + '/' + key)
      .snapshotChanges()
      .pipe(
        take(1),
        map((action) => {
          const key = action.key;
          const val = action.payload.val();
          return { key, ...(val as Reservation) };
        })
      );
  }

  create(reservation: Reservation): any {
    return this.reservationsRef.push(reservation);
  }

  update(key: string, value: any): Promise<void> {
    return this.reservationsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.reservationsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.reservationsRef.remove();
  }
}
