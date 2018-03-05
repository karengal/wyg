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
/*   categoriesObj= {data: {categories: new Array<{category_id:number, category_name: string}>()}};
 */rooms: RoomModel[];
openDialogRef: MatDialogRef<AddRoomDialogComponent>;
  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.daysColGenerator();
    this.getRooms();
    console.log(this.rooms);
    /* this.getCatagories();
    this.dataService.getAddedCategoryEmmiter().subscribe(
      ()=>{this.getCatagories()}) */
    
 }

/*  getCatagories(){
   this.dataService.getCategories().subscribe(
     data=>{
      console.log(data);
      this.categoriesObj.data.categories = data;
     }
   ),error=>console.log('error');
 } */

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
        console.log('hiiii ', data); 
      this.dataSource = data;
      }
    ),error=>console.log(error)
  }

daysColGenerator(){
  let generatorObj = this.dataService.daysColGenerator()
  this.numbersArray = generatorObj.numbersArray;
  this.numbersObjArray = generatorObj.numbersObjArray;
  this.displayedColumns = generatorObj.displayedColumns;
}
}
