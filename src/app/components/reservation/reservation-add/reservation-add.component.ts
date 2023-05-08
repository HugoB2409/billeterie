import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Event, Option } from 'src/app/models/event.model';
import { Reservation, Seat } from 'src/app/models/reservation.model';
import { ClientService } from 'src/app/services/client.service';
import { EventService } from 'src/app/services/event.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationDialogComponent } from '../../dialog/reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss'],
})
export class ReservationAddComponent implements OnInit {
  reservation: Reservation = new Reservation();
  selectedClient?: Client;
  selectedEvent?: Event;
  clients?: Client[];
  events?: Event[];
  reservationForm?: FormGroup;
  columnsToDisplay = ['name', 'price', 'quantity'];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private eventService: EventService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getEvents();

    this.reservationForm = this.formBuilder.group({
      client: ['', [Validators.required]],
      event: ['', [Validators.required]],
      seats: this.formBuilder.array([]),
      total: [0],
    });
  }

  saveReservation(): void {
    if (this.reservationForm) {
      this.reservationForm.value.total = this.getTotalPrice();

      const dialogRef = this.dialog.open(ReservationDialogComponent, {
        data: {
          client: this.selectedClient,
          event: this.selectedEvent,
          seats: this.seats.value,
          total: this.getTotalPrice(),
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result && this.reservationForm) {
          this.reservationService
            .create(this.reservationForm?.value)
            .then(() => {
              this.router.navigate(['/reservations']);
            });
        }
      });
    }
  }

  getClients(): void {
    this.clientService.getAll().subscribe((data) => {
      this.clients = data;
    });
  }

  getEvents(): void {
    this.eventService.getAll().subscribe((data) => {
      this.events = data;
    });
  }

  get seats() {
    return this.reservationForm?.get('seats') as FormArray;
  }

  getTotalQuantity(): number {
    let sum: number = 0;
    this.seats.value.forEach((seat: Seat) => {
      if (seat.quantity) sum += seat.quantity;
    });
    return sum;
  }

  getTotalPrice(): number {
    let sum: number = 0;
    this.seats.value.forEach((seat: Seat) => {
      if (seat.quantity && seat.price) sum += seat.quantity * seat.price;
    });
    return sum;
  }

  displayClient(key?: string) {
    if (this.clients) {
      let client = this.clients.find((client) => client.key === key);
      this.selectedClient = client;
      return client ? `${client.firstname}  ${client.lastname}` : '';
    }
    return '';
  }

  displayEvent(key?: string) {
    if (this.events) {
      let event = this.events.find((event) => event.key === key);
      this.selectedEvent = event;
      return event ? `${event.title} - ${event.date}` : '';
    }
    return '';
  }

  onEventChange(changeEvent: any) {
    let event;

    if (this.reservationForm?.value.seats.length) {
      this.reservationForm.controls['seats'] = this.formBuilder.array([]);
    }

    event = this.events?.find(
      (event) => event.key === changeEvent.option.value
    );

    event?.options?.forEach((option: Option) => {
      let seat = this.formBuilder.group({
        name: [option.name],
        price: [option.price],
        quantity: [0, [Validators.required]],
      });

      this.seats.push(seat);
    });
  }
}
