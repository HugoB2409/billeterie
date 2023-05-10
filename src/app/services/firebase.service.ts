import { Observable } from 'rxjs';

export interface IRealtimeDatabaseService<T> {
  getAll(): Observable<T[]>;
  get(key: string): Observable<T>;
  create(item: T): any;
  update(key: string, value: any): Promise<void>;
  delete(key: string): Promise<void>;
}
