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
  clients?: Client[];
  columnsToDisplay = ['firstname', 'lastname', 'address', 'phoneNumber'];

  constructor(
    private clientService: ClientService,
    private csvService: CsvService
  ) {}

  ngOnInit(): void {
    this.clientService.getAll().subscribe((data) => {
      this.clients = data;
    });
  }

  downloadCSV() {
    if (this.clients) {
      this.csvService.download(this.clients, 'clients.csv');
    }
  }
}
