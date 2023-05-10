import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { Event } from 'src/app/models/event.model';
import { ClientService } from 'src/app/services/client.service';
import { EventService } from 'src/app/services/event.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationDialogComponent } from '../../dialog/reservation-dialog/reservation-dialog.component';
import { Seat } from 'src/app/models/seat.model';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss'],
})
export class ReservationAddComponent implements OnInit {
  private _selectedClient?: Client = undefined;
  private _selectedEvent?: Event = undefined;
  private _clients?: Client[] = undefined;
  private _events?: Event[] = undefined;
  private _reservationForm?: FormGroup = undefined;
  private _columnsToDisplay: string[] = ['name', 'price', 'quantity'];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private clientService: ClientService,
    private eventService: EventService,
    private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.getClients();
    this.getEvents();

    this._reservationForm = this.formBuilder.group({
      client: ['', [Validators.required]],
      event: ['', [Validators.required]],
      seats: this.formBuilder.array([]),
      total: [0],
    });
  }

  public saveReservation(): void {
    if (!this._reservationForm) return;
    this._reservationForm.value.total = this.getTotalPrice();

    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      data: {
        client: this._selectedClient,
        event: this._selectedEvent,
        seats: this.seats.value,
        total: this.getTotalPrice(),
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result || !this._reservationForm) return;
      await this.reservationService.create(this._reservationForm?.value)
      this.router.navigate(['/reservations']);
    });
  }

  public onEventChange(changeEvent: any): void {
    if (this._reservationForm?.value.seats.length) {
      this._reservationForm.controls['seats'] = this.formBuilder.array([]);
    }

    const event = this._events?.find(
      (event) => event.key === changeEvent.option.value
    );

    event?.options?.forEach((option: Option) => {
      const seat = this.formBuilder.group({
        name: [option.name],
        price: [option.price],
        quantity: [0, [Validators.required]],
      });

      this.seats.push(seat);
    });
  }

  public displayClient(key?: string): string {
    if (!this._clients) return '';
    let client = this._clients.find((client) => client.key === key);
    this._selectedClient = client;
    return client ? `${client.firstname}  ${client.lastname}` : '';
  }

  public displayEvent(key?: string): string {
    if (!this._events) return '';
    let event = this._events.find((event) => event.key === key);
    this._selectedEvent = event;
    return event ? `${event.title} - ${event.date}` : '';
  }

  public getClients(): void {
    this.clientService.getAll().subscribe((data) => this._clients = data);
  }

  public getEvents(): void {
    this.eventService.getAll().subscribe((data) => this._events = data);
  }

  public getTotalQuantity(): number {
    return this.seats.value.reduce((prec: number, curr: Seat) => prec + (curr.quantity ?? 0), 0);
  }

  public getTotalPrice(): number {
    return this.seats.value.reduce((prec: number, curr: Seat) => prec + (curr.quantity ?? 0) * (curr.price ?? 0), 0);
  }

  public get seats(): FormArray {
    return this._reservationForm?.get('seats') as FormArray;
  }

  public get events(): Event[] | undefined {
    return this._events;
  }

  public get clients(): Client[] | undefined {
    return this._clients;
  }

  public get reservationForm(): FormGroup | undefined {
    return this._reservationForm;
  }

  public get columnsToDisplay(): string[] {
    return this._columnsToDisplay;
  }
}
