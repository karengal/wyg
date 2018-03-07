import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from '../data.service';
import { catchError } from 'rxjs/operators/catchError';
/* import { map } from 'rxjs/operators/map';
 */import { filter } from 'rxjs/operators';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { of as observableOf } from 'rxjs/observable/of';
import { RoomModel } from '../models/RoomModel';
import { AddRoomDialogComponent } from '../add-room-dialog/add-room-dialog.component';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { CustomEmitObj } from '../edit-menu/edit-menu.component';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {
  numbersObjArray = new Array();
  numbersArray = new Array();
  dataSource;
  displayedColumns: any[]
  categories: { category_id: number, category_name: string }[];
  rooms: RoomModel[];
  openDialogRef: MatDialogRef<AddRoomDialogComponent>;
  openEditDialogRef: MatDialogRef<EditRoomComponent>;
  constructor(private ref: ChangeDetectorRef, private dataService: DataService, public dialog: MatDialog, private changeDetection: ChangeDetectionStrategy.OnPush) { }

  ngOnInit() {
    this.ref.markForCheck();
    this.daysColGenerator();
    this.getRooms();
    this.getCategories();

  }

  getCategories() {
    this.dataService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    ), error => console.log('error');
  }

  openDialog() {
    this.openDialogRef = this.dialog.open(AddRoomDialogComponent,
      { data: { categories: this.categories } });

    this.openDialogRef
      .afterClosed()
      .subscribe(
        result => {
          console.log(result);
          this.dataService.addRoom(result).subscribe(
            data => this.dataSource.detectChanges()
          ),
            error => console.log('error', error)
        }
      ), error => console.log('error', error)
  }

  getRooms() {
    this.dataService.getRooms().subscribe(
      data => {
        this.dataSource = data;
      }
    ), error => console.log(error)
  }

  daysColGenerator() {
    let generatorObj = this.dataService.daysColGenerator()
    this.numbersArray = generatorObj.numbersArray;
    this.numbersObjArray = generatorObj.numbersObjArray;
    this.displayedColumns = generatorObj.displayedColumns;
  }

  refresh(){
    this.dataService.getRooms().subscribe(
      (data) => {
        this.dataSource = data;
        this.dataSource.detectChanges();
      })
  }

  handleEdit(obj: CustomEmitObj) {
    console.log(obj);
    console.log(obj.mode);
    if (obj.mode === false){
      this.dataService.deleteRoom(obj.element).subscribe(
        data => {
           this.dataSource.detectChanges();
        }, error => console.log(error));
    } else {
      // this.openEditDialogRef = this.dialog.open(EditRoomComponent,
      //   { data: { room: obj.element } });
  
      // this.openEditDialogRef
      //   .afterClosed()
      //   .subscribe(
      //     result => {
      //       console.log(result);
      //       this.dataService.editRoom(result).subscribe(
      //         data => console.log(data)
      //       ),
      //         error => console.log('error')
      //     }
      //   ), error => console.log('error')
    }
  }
}
