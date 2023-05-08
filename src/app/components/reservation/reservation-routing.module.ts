import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';

const routes: Routes = [
  { path: '', component: ReservationsListComponent },
  { path: 'new', component: ReservationAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
