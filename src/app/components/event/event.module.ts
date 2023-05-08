import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material-module';
import { MaterialExtensionsModule } from '../../material-extensions-module';
import { EventRoutingModule } from './event-routing.module';
import { EventAddComponent } from './event-add/event-add.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventsListComponent } from './events-list/events-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventReservationsComponent } from './event-reservations/event-reservations.component';

@NgModule({
  declarations: [EventAddComponent, EventDetailsComponent, EventsListComponent, EventReservationsComponent],
  imports: [
    CommonModule,
    MaterialExtensionsModule,
    MaterialModule,
    EventRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EventModule {}
