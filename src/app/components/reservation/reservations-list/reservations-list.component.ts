import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Event } from 'src/app/models/event.model';
import { Reservation, Seat } from 'src/app/models/reservation.model';
import { ClientService } from 'src/app/services/client.service';
import { EventService } from 'src/app/services/event.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { uniq } from 'lodash';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss'],
})
export class ReservationsListComponent implements OnInit {
  reservations?: {
    client: Client | undefined;
    event: Event | undefined;
    key?: string | null | undefined;
    seats?: Seat[] | undefined;
    total?: number | undefined;
  }[];
  columnsToDisplay = ['spectacle', 'client', 'total'];

  constructor(
    private reservationService: ReservationService,
    private clientService: ClientService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService
      .getAll()
      .pipe(
        switchMap((reservations) => {
          const clientIds = uniq(
            reservations.map((reservation: Reservation) => reservation.client)
          );
          const eventIds = uniq(
            reservations.map((reservation: Reservation) => reservation.event)
          );

          const clients = this.getClients(clientIds);
          const events = this.getEvents(eventIds);

          return forkJoin([
            of(reservations),
            combineLatest(clients),
            combineLatest(events),
          ]);
        }),
        map(([reservations, clients, events]) => {
          return reservations.map((reservation) => ({
            ...reservation,
            client: clients.find(
              (client) => client && client.key === reservation.client
            ),
            event: events.find(
              (event) => event && event.key === reservation.event
            ),
          }));
        })
      )
      .subscribe((data) => (this.reservations = data));
  }

  getClients(clientIds: (string | undefined)[]) {
    return clientIds.map((clientId) => this.clientService.get(clientId ?? ''));
  }

  getEvents(eventIds: (string | undefined)[]) {
    return eventIds.map((eventId) => this.eventService.get(eventId ?? ''));
  }
}
