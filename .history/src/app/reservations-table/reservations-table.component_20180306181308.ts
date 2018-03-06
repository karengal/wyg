import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MatSort } from '@angular/material';
import { DataService } from '../data.service';
import { catchError } from 'rxjs/operators/catchError';
import { filter } from 'rxjs/operators';
 import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { of as observableOf } from 'rxjs/observable/of';
import { RoomModel } from '../models/RoomModel';
import { AddRoomDialogComponent } from '../add-room-dialog/add-room-dialog.component';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { CalenderService } from '../calender.service';
import { CustomEmitObj } from '../edit-menu/edit-menu.component';
import { EditRoomComponent } from '../edit-room/edit-room.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {
  numbersObjArray = new Array();
  numbersArray = new Array();
  dataSource = new MatTableDataSource();
  displayedColumns = ['room'];
  categories: { category_id: number, category_name: string }[];
  rooms: RoomModel[];
  openDialogRef: MatDialogRef<AddRoomDialogComponent>;
  openEditDialogRef: MatDialogRef<EditRoomComponent>;
  openCatDialogRef: MatDialogRef<AddCategoryDialogComponent>;
  isLoadingResults = true;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private calenderService:CalenderService, private changeDetectorRefs: ChangeDetectorRef, private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
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

  changeDays(){
    let fullDate = this.numbersObjArray[this.numbersObjArray.length-1].db_date
    this.calenderService.jumpTen(fullDate).subscribe(
      result=>{
        this.displayedColumns=["room"];
        this.numbersObjArray = [];
        for (var i = 0; i < result.length; i++){
          let dayNum = result[i].dayNum.toString();
          this.displayedColumns.push(dayNum);
        }
        console.log(this.displayedColumns);
        this.numbersObjArray = result; 
      }    ),error=>console.log(error);
  }

  changeDaysBackwards(){
    let fullDate = this.numbersObjArray[0].db_date
    this.calenderService.jumpTenBack(fullDate).subscribe(
      result=>{
        this.displayedColumns=["room"];
        this.numbersObjArray = [];
        for (var i = 0; i < result.length; i++){
          let dayNum = result[i].dayNum.toString();
          this.displayedColumns.push(dayNum);
        }
        console.log(this.displayedColumns);
        this.numbersObjArray = result; 
      }    ),error=>console.log(error);
  }

daysColGenerator(){
  this.calenderService.daysColGenerator_fromDb().subscribe(
    result=>{
      for (var i = 0; i < result.length; i++){
        let dayNum = result[i].dayNum.toString();
        this.displayedColumns.push(dayNum);
      }
      this.numbersObjArray = result; 
    }
  ), error=>console.log(error);
}


  handleEdit(obj: CustomEmitObj) {
    if (obj.mode === false){
      this.dataService.deleteRoom(obj.id).subscribe(
        data => {
           this.getRooms();
        }, error => console.log(error));
    } else {
      this.openEditDialogRef = this.dialog.open(EditRoomComponent,
        { data: { room: obj.element, categories: this.categories } });
  
      this.openEditDialogRef
        .afterClosed()
        .subscribe(
          result => {
            console.log(result);
            this.dataService.editRoom(result).subscribe(
              data => this.getRooms()
            ),
              error => console.log('error')
          }
        ), error => console.log('error')
    }
  }

  openDialogCategories(){
    this.openCatDialogRef = this.dialog.open(AddCategoryDialogComponent);
    this.openCatDialogRef
    .afterClosed()
    .subscribe(
      result=> {
        this.dataService.addCategory(result).subscribe(
          data=>{
            this.dataService.categoryWasAdded();
          }
        ), error=>console.log('error');
      }
    ), error=> console.log('error')
  };
}
