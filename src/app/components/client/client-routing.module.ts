import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsAddComponent } from './clients-add/clients-add.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';

const routes: Routes = [
  { path: '', component: ClientsListComponent },
  { path: 'new', component: ClientsAddComponent },
  { path: ':key', component: ClientsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
