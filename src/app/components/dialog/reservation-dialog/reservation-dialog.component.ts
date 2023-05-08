import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model';
import { Event } from 'src/app/models/event.model';
import { Reservation, Seat } from 'src/app/models/reservation.model';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {
  client?: Client;
  event?: Event;
  seats?: Seat[];
  total?: number;

  constructor(
    public dialog: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.client = this.data.client;
    this.event = this.data.event;
    this.seats = this.data.seats;
    this.total = this.data.total;
  }

  cancel() {
    this.close(false);
  }

  close(value: boolean) {
    this.dialog.close(value);
  }

  confirm() {
    this.close(true);
  }

  @HostListener('keydown.esc')
  onEsc() {
    this.close(false);
  }
}
