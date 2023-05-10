import { Seat } from './seat.model';

export interface Reservation {
  key?: string | null;
  event?: string;
  client?: string;
  seats?: Seat[];
  total?: number;
}