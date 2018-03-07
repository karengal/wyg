import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomModel } from '../models/RoomModel';
import { CustomEmitObj } from '../edit-menu/edit-menu.component';


@Component({
  selector: 'app-table-test',
  templateUrl: './table-test.component.html',
  styleUrls: ['./table-test.component.css']
})
export class TableTestComponent implements OnInit {

  constructor() { }
    /* displayedColumns = ['position', 'name', 'weight', 'symbol']; */
  @Input() dataSource: RoomModel;
  @Input() columns;
  @Input() numbersArray;
  @Output() update:EventEmitter<CustomEmitObj> = new EventEmitter();
  dataSourceArray = new Array();
  displayedColumns = new Array();

  

  ngOnInit() {
    this.dataSourceArray.push(this.dataSource)
    this.displayedColumns = this.columns;
  }

  notify(obj:CustomEmitObj){
    this.update.emit(obj);
  }
}
