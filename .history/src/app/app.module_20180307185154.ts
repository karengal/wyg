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
import { HomeComponent } from './home/home.component';
import { CalenderService } from './calender.service';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { DayCellComponent } from './day-cell/day-cell.component';
import { RoomNameComponent } from './room-name/room-name.component';
import { EditorBtnsComponent } from './editor-btns/editor-btns.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ReservationsTableComponent,
    RoomComponent,
    TableTestComponent,
    AddRoomDialogComponent,
    AddCategoryDialogComponent,
    HomeComponent,
    EditMenuComponent,
    EditRoomComponent,
    DayCellComponent,
    RoomNameComponent,
    EditorBtnsComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule ,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayModule,
    AppRoutingModule
  ],
  providers: [DataService, CalenderService],
  bootstrap: [AppComponent],
  entryComponents: [AddRoomDialogComponent, AddCategoryDialogComponent, EditRoomComponent, SnackBarComponent]
})
export class AppModule { }
