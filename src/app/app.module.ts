import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialExtensionsModule } from './material-extensions-module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DeleteDialogComponent } from './components/dialog/delete-dialog/delete-dialog.component';
import { ReservationDialogComponent } from './components/dialog/reservation-dialog/reservation-dialog.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, NotFoundComponent, DeleteDialogComponent, ReservationDialogComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    MaterialExtensionsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
