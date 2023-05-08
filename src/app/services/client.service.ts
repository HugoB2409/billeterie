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
  private dbPath = '/clients';

  clientsRef: AngularFireList<Client>;

  constructor(private db: AngularFireDatabase) {
    this.clientsRef = db.list(this.dbPath);
  }

  getAll(): Observable<Client[]> {
    return this.clientsRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  get(key: string): Observable<Client> {
    return this.db
      .object(this.dbPath + '/' + key)
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

  create(client: Client): any {
    return this.clientsRef.push(client);
  }

  update(key: string, value: any): Promise<void> {
    return this.clientsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.clientsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.clientsRef.remove();
  }
}
