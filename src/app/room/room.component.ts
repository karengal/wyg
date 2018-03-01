import { Component, OnInit, Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
@Input() room: any;
@Input() displayedColumns;
daysInMonth: Array<number>;
  constructor() { }

  ngOnInit() {
    console.log(this.room);
 this.daysInMonth = this.displayedColumns.shift();
  }

}
