import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Reservation } from '../models/reservation.model';
import { IRealtimeDatabaseService } from './firebase.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService implements IRealtimeDatabaseService<Reservation>
{
  private _dbPath = '/reservations';
  private _reservationsRef: AngularFireList<Reservation>;

  constructor(private db: AngularFireDatabase) {
    this._reservationsRef = db.list(this._dbPath);
  }

  public getAll(): Observable<Reservation[]> {
    return this._reservationsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  public get(key: string): Observable<Reservation> {
    return this.db
      .object(this._dbPath + '/' + key)
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

  public create(reservation: Reservation): any {
    return this._reservationsRef.push(reservation);
  }

  public update(key: string, value: any): Promise<void> {
    return this._reservationsRef.update(key, value);
  }

  public delete(key: string): Promise<void> {
    return this._reservationsRef.remove(key);
  }
}
