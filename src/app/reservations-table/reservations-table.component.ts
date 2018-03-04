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
  displayedColumns: any[]
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
  let generatorObj = this.dataService.daysColGenerator()
  this.numbersArray = generatorObj.numbersArray;
  this.numbersObjArray = generatorObj.numbersObjArray;
  this.displayedColumns = generatorObj.displayedColumns;
}
}
