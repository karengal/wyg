import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { DataService } from '../data.service';


@Component({
  selector: 'app-reservations-table',
  templateUrl: './reservations-table.component.html',
  styleUrls: ['./reservations-table.component.css']
})
export class ReservationsTableComponent implements OnInit {
  displayedColumns = ['room'];
  dataSource= new MatTableDataSource();
@Input() month: {month: number, year: number};
rooms: any;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log(this.dataService.getRooms());
    this.dataSource.data= this.dataService.getRooms()
/*     console.log(this.getRooms())
 */  }

  getRooms(){
    this.dataService.getRooms();
  }

  daysColGenerator(){
    function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
      return new Date(year, month, 0).getDate();
     };
     let N = daysInMonth(1, 2013);
     let array = new Array(N)
     array.fill(null).map((e, i) => i+1);
     for (let i = 0; i < array.length; i++){
       this.displayedColumns.push(array[i]);
     }
  }
}
