import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { DataService } from '../data.service';
import { catchError } from 'rxjs/operators/catchError';
/* import { map } from 'rxjs/operators/map';
 */import { filter } from 'rxjs/operators';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { of as observableOf } from 'rxjs/observable/of';
import { RoomModel } from '../models/RoomModel';

@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {
  numbersObjArray = new Array();
  numbersArray = new Array();
  dataSource;
  displayedColumns: any[] = ['room'];
/*   dataSource= new MatTableDataSource();
 */@Input() month: {month: number, year: number};
rooms: RoomModel[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.daysColGenerator();
    this.getRooms();
    console.log(this.rooms);
    
 }

/*   getRooms(){
    this.dataService.getRooms()
    .pipe(
      startWith({}),
      switchMap(() => {
        return this.dataService.getRooms();
      }),
      catchError(() => {
        return observableOf([]);
      })
    ).subscribe(
      data=>{
        this.dataSource = data;
        console.log('hhhiiii ',this.dataSource);
      }
    ),error=>console.log(error);
  } */

  getRooms(){
    this.dataService.getRooms().subscribe(
      data=>{
        console.log(data); 
      this.dataSource = data;
      console.log(this.rooms);
      }
    ),error=>console.log(error)
  }

daysColGenerator(){
  this.numbersArray = this.dataService.daysColGenerator().numbersArray;
  this.numbersObjArray = this.dataService.daysColGenerator().numbersObjArray;
  this.displayedColumns = this.dataService.daysColGenerator().displayedColumns;
  console.log('a ', this.numbersArray);
  console.log('b ', this.numbersObjArray);
  console.log('c ', this.displayedColumns);

}

  /* daysColGenerator(){
    function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
      return new Date(year, month, 0).getDate();
     };
     let N = daysInMonth(1, 2013);
     let array = new Array(N)
     this.numbersArray = array.fill(0).map((e, i) => {return (i+1).toString()});
     console.log(this.numbersArray);
     for (let i = 0; i < this.numbersArray.length; i++){
       let n = new Date(2013, 1,this.numbersArray[i]).getDay();
       this.displayedColumns.push(this.numbersArray[i]);
       let obj;
       if (n == 0){
         obj = {num: this.numbersArray[i], day:'sunday'}
       } else if (n == 1){
         obj = {num: this.numbersArray[i], day:'monday'}
       } else if (n == 2){
         obj = {num: this.numbersArray[i], day:'tuesday'}
       } else if (n == 3){
         obj = {num: this.numbersArray[i], day:'wednesday'}
       }else if (n == 4){
         obj = {num: this.numbersArray[i], day:'thursday'}
       }else if (n == 5){
         obj = {num: this.numbersArray[i], day:'friday'}
       }else if (n == 6){
         obj = {num: this.numbersArray[i], day:'saterday'}
       }
       this.numbersObjArray.push(obj);
     }
     console.log(this.displayedColumns);
     console.log(this.numbersArray);
  } */
}
