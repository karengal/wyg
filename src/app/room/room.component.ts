import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
@Input() room;
@Input() displayedColumns;
dataSource;
daysInMonth: Array<number>;
arrayOfRoom = new Array();
  constructor() { }

  ngOnInit() {
    console.log(this.room);
 this.displayedColumns.shift();
 this.daysInMonth = this.displayedColumns;
 this.arrayOfRoom.push(this.room);
 this.dataSource = this.arrayOfRoom;
 console.log(this.dataSource);
  }

}
