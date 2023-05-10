import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() { }

  public download(data: any, filename: string): void {
    const replacer = (_key: any, value: any) =>
      value === null ? 'EMPTY' : value;

    const header = Object.keys(data[0]);

    let csv = data.map((row: any) =>
      header
        .map((fieldName) =>
          JSON.stringify((row as { [k in string]: any })[fieldName], replacer)
        )
        .join(',')
    );

    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    saveAs(new Blob([csvArray], { type: 'text/csv' }), filename);
  }
}
