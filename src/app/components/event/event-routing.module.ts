import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventReservationsComponent } from './event-reservations/event-reservations.component';

const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: 'new', component: EventAddComponent },
  { path: ':key', component: EventDetailsComponent },
  { path: ':key/reservations', component: EventReservationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
