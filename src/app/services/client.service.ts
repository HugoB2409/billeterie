import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Client } from '../models/client.model';
import { IRealtimeDatabaseService } from './firebase.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService implements IRealtimeDatabaseService<Client> {
  private _dbPath = '/clients';
  private _clientsRef: AngularFireList<Client>;

  constructor(private db: AngularFireDatabase) {
    this._clientsRef = db.list(this._dbPath);
  }

  public getAll(): Observable<Client[]> {
    return this._clientsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  public get(key: string): Observable<Client> {
    return this.db
      .object(this._dbPath + '/' + key)
      .snapshotChanges()
      .pipe(
        take(1),
        map((action) => {
          const key = action.key;
          const val = action.payload.val();
          return { key, ...(val as Client) };
        })
      );
  }

  public create(client: Client): any {
    return this._clientsRef.push(client);
  }

  public update(key: string, value: any): Promise<void> {
    return this._clientsRef.update(key, value);
  }

  public delete(key: string): Promise<void> {
    return this._clientsRef.remove(key);
  }
}
