import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Reservation, Seat } from 'src/app/models/reservation.model';
import { ClientService } from 'src/app/services/client.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { uniq } from 'lodash';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CsvService } from 'src/app/services/csv.service';

@Component({
  selector: 'app-event-reservations',
  templateUrl: './event-reservations.component.html',
  styleUrls: ['./event-reservations.component.scss'],
})
export class EventReservationsComponent implements OnInit {
  reservations?: {
    client: Client | undefined;
    key?: string | null | undefined;
    event?: string | undefined;
    seats?: Seat[] | undefined;
    total?: number | undefined;
  }[];
  key?: string | null;
  columnsToDisplay = ['client', 'total'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private csvService: CsvService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.key = paramMap.get('key');
      if (this.key) {
        this.getReservations();
      }
    });
  }

  getReservations(): void {
    this.reservationService
      .getAll()
      .pipe(
        switchMap((reservations) => {
          const clientIds = uniq(
            reservations.map((reservation: Reservation) => reservation.client)
          );

          const clients = this.getClients(clientIds);

          return forkJoin([
            of(
              reservations.filter(
                (reservation) => reservation.event === this.key
              )
            ),
            combineLatest(clients),
          ]);
        }),
        map(([reservations, clients]) => {
          return reservations.map((reservation) => ({
            ...reservation,
            client: clients.find(
              (client) => client && client.key === reservation.client
            ),
          }));
        })
      )
      .subscribe((data) => (this.reservations = data));
  }

  getClients(clientIds: (string | undefined)[]) {
    return clientIds.map((clientId) => this.clientService.get(clientId ?? ''));
  }

  downloadCSV() {
    if (this.reservations) {
      this.csvService.download(this.reservations, 'reservations.csv');
    }
  }
}
