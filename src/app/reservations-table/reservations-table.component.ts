import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource, MatDialogRef, MatDialog} from '@angular/material';
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
import { CalenderService } from '../calender.service';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {
  numbersObjArray = new Array();
  dataSource;
  displayedColumns = ['room']
/*   categoriesObj= {data: {categories: new Array<{category_id:number, category_name: string}>()}};
 */rooms: RoomModel[];
openDialogRef: MatDialogRef<AddRoomDialogComponent>;
  constructor(private dataService: DataService, private calenderService: CalenderService, public dialog: MatDialog) { }

  ngOnInit() {
    this.daysColGenerator();
    this.getRooms();
    console.log(this.rooms);
 }

 openDialog(){
   this.openDialogRef = this.dialog.open(AddRoomDialogComponent, 
      /* this.categoriesObj */);
   
   this.openDialogRef
   .afterClosed()
   .subscribe(
     result=> {
       console.log(result);
        this.dataService.addRoom(result).subscribe(
          data=>console.log(data)
        ),
      error=>console.log('error')}
   ),error=>console.log('error')
 }

  getRooms(){
    this.dataService.getRooms().subscribe(
      data=>{
      this.dataSource = data;
      }
    ),error=>console.log(error)
  }

  changeDays(){
    let fullDate = this.numbersObjArray[this.numbersObjArray.length-1].db_date
    console.log(fullDate);
    this.calenderService.jumpTen(fullDate).subscribe(
      result=>{
        this.displayedColumns=["room"];
        this.numbersObjArray = [];
        console.log(result);
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
    console.log(fullDate);
    this.calenderService.jumpTenBack(fullDate).subscribe(
      result=>{
        this.displayedColumns=["room"];
        this.numbersObjArray = [];
        console.log(result);
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
      console.log(result);
      for (var i = 0; i < result.length; i++){
        let dayNum = result[i].dayNum.toString();
        this.displayedColumns.push(dayNum);
      }
      console.log(this.displayedColumns);
      this.numbersObjArray = result; 
    }
  ), error=>console.log(error);
}
}
