import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { Reservation } from 'src/app/models/reservation.model';
import { ClientService } from 'src/app/services/client.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { uniq } from 'lodash';
import { switchMap, map } from 'rxjs/operators';
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CsvService } from 'src/app/services/csv.service';
import { Seat } from 'src/app/models/seat.model';

interface ReservationSummary {
  key?: string | null;
  client?: Client;
  event?: string;
  seats?: Seat[];
  total?: number;
}

@Component({
  selector: 'app-event-reservations',
  templateUrl: './event-reservations.component.html',
  styleUrls: ['./event-reservations.component.scss'],
})
export class EventReservationsComponent implements OnInit {
  private _reservations?: ReservationSummary[] = undefined;
  private _key: string | null = null;
  private _columnsToDisplay: string[] = ['client', 'total'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private csvService: CsvService) { }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this._key = paramMap.get('key');
      this.getReservations();
    });
  }

  public getReservations(): void {
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
                (reservation) => reservation.event === this._key
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
      .subscribe((data) => (this._reservations = data));
  }

  private getClients(clientIds: (string | undefined)[]): Observable<Client>[] {
    return clientIds.map((clientId) => this.clientService.get(clientId ?? ''));
  }

  public downloadCSV(): void {
    this.csvService.download(this._reservations, 'reservations.csv');
  }

  public get reservations(): ReservationSummary[] | undefined {
    return this._reservations;
  }

  public get columnsToDisplay(): string[] {
    return this._columnsToDisplay;
  }
}
