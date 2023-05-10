import { Option } from './option.model';

export interface Event {
  key?: string | null;
  title?: string;
  date?: string;
  options?: Option[];
}