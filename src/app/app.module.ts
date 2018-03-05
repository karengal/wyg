import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationsTableComponent } from './reservations-table/reservations-table.component';
import { DataService } from './data.service';
import { RoomComponent } from './room/room.component';
import { TableTestComponent } from './table-test/table-test.component';
import { AddRoomDialogComponent } from './add-room-dialog/add-room-dialog.component';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    ReservationsTableComponent,
    RoomComponent,
    TableTestComponent,
    AddRoomDialogComponent,
    AddCategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [AddRoomDialogComponent, AddCategoryDialogComponent]
})
export class AppModule { }
