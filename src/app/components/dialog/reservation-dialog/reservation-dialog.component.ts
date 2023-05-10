import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model';
import { Event } from 'src/app/models/event.model';
import { Seat } from 'src/app/models/seat.model';

interface ReservationSummary {
  client?: Client;
  event?: Event;
  seats?: Seat[];
  total?: number;
}

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {
  private _client?: Client = undefined;
  private _event?: Event = undefined;
  private _seats?: Seat[] = undefined;
  private _total?: number = 0;

  constructor(
    private dialog: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ReservationSummary) { }

  public ngOnInit(): void {
    this._client = this.data.client;
    this._event = this.data.event;
    this._seats = this.data.seats;
    this._total = this.data.total;
  }

  public cancel(): void {
    this.close(false);
  }

  public confirm(): void {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }

  public close(value: boolean): void {
    this.dialog.close(value);
  }

  public get client(): Client | undefined {
    return this._client;
  }

  public get event(): Event | undefined {
    return this._event;
  }

  public get seats(): Seat[] | undefined {
    return this._seats;
  }

  public get total(): number | undefined {
    return this._total;
  }
}
