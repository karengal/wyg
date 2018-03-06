import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MatSort } from '@angular/material';
import { DataService } from '../data.service';
import { catchError } from 'rxjs/operators/catchError';
/* import { map } from 'rxjs/operators/map';
 */import { filter } from 'rxjs/operators';
 import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { of as observableOf } from 'rxjs/observable/of';
import { RoomModel } from '../models/RoomModel';
import { AddRoomDialogComponent } from '../add-room-dialog/add-room-dialog.component';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { CustomEmitObj } from '../edit-menu/edit-menu.component';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit, OnDestroy {
  init;
  numbersObjArray = new Array();
  numbersArray = new Array();
  dataSource = new MatTableDataSource();
  displayedColumns: any[]
  categories: { category_id: number, category_name: string }[];
  rooms: RoomModel[];
  openDialogRef: MatDialogRef<AddRoomDialogComponent>;
  openEditDialogRef: MatDialogRef<EditRoomComponent>;
  isLoadingResults = true;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private changeDetectorRefs: ChangeDetectorRef, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.daysColGenerator();
    this.init = this.getRooms();
    this.getCategories();

  }

  ngOnDestroy(){
    this.init.dispose();
  }

  getCategories() {
    this.dataService.getCategories().subscribe(
      data => {
        console.log(data);
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
            data => this.getRooms()
          ),
            error => console.log('error', error)
        }
      ), error => console.log('error', error)
  }

  getRooms() {
    this.sort.sortChange.subscribe()
    merge(this.sort.sortChange)
      .pipe (
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.dataService.getRooms();
        }),
        map(data => {
          this.isLoadingResults = false;
          return data
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe((data) =>{
        this.dataSource.data = data;
        this.changeDetectorRefs.detectChanges()
      });
  }

  daysColGenerator() {
    let generatorObj = this.dataService.daysColGenerator()
    this.numbersArray = generatorObj.numbersArray;
    this.numbersObjArray = generatorObj.numbersObjArray;
    this.displayedColumns = generatorObj.displayedColumns;
  }

  handleEdit(obj: CustomEmitObj) {
    console.log(obj);
    console.log(obj.mode);
    if (obj.mode === false){
      this.dataService.deleteRoom(obj.element).subscribe(
        data => {
           this.getRooms();
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
