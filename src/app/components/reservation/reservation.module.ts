import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material-module';
import { MaterialExtensionsModule } from '../../material-extensions-module';
import { ReservationRoutingModule } from './reservation-routing.module';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReservationAddComponent, ReservationsListComponent],
  imports: [
    CommonModule,
    MaterialExtensionsModule,
    MaterialModule,
    ReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ReservationModule {}
