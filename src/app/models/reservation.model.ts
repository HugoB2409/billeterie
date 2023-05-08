export class Reservation {
  key?: string | null;
  event?: string;
  client?: string;
  seats?: Seat[];
  total?: number;
}

export class Seat {
  name?: string;
  price?: number;
  quantity?: number;
}
