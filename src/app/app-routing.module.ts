import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: 'events',
    loadChildren: () =>
      import('./components/event/event.module').then((m) => m.EventModule),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./components/client/client.module').then((m) => m.ClientModule),
  },
  {
    path: 'reservations',
    loadChildren: () =>
      import('./components/reservation/reservation.module').then(
        (m) => m.ReservationModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
