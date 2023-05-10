import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  private _clients?: Client[] = undefined;
  private _columnsToDisplay: string[] = ['firstname', 'lastname', 'address', 'phoneNumber'];

  constructor(
    private clientService: ClientService,
    private csvService: CsvService) { }

  public ngOnInit(): void {
    this.clientService.getAll().subscribe((data: Client[]) => {
      this._clients = data;
    });
  }

  public downloadCSV(): void {
    this.csvService.download(this._clients, 'clients.csv');
  }

  public get clients(): Client[] | undefined {
    return this._clients;
  }

  public get columnsToDisplay(): string[] {
    return this._columnsToDisplay;
  }
}
