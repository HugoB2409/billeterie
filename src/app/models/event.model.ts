export class Event {
  key?: string | null;
  title?: string;
  date?: string;
  options?: Option[];
}

export class Option {
  name?: string;
  price?: number;
}
