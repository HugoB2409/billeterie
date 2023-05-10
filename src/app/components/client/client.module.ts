import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material-module';
import { MaterialExtensionsModule } from '../../material-extensions-module';
import { ClientRoutingModule } from './client-routing.module';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsDetailsComponent } from './clients-details/clients-details.component';
import { ClientsAddComponent } from './clients-add/clients-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientsListComponent,
    ClientsDetailsComponent,
    ClientsAddComponent,
  ],
  imports: [
    CommonModule,
    MaterialExtensionsModule,
    MaterialModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})

export class ClientModule { }
