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
  @Output() edDel:EventEmitter<any> = new EventEmitter();
  dataSourceArray = new Array();
  displayedColumns = new Array();
  isClassVisible = false;

  ngOnInit() {
    this.dataSourceArray.push(this.dataSource)
    this.displayedColumns = this.columns;
    console.log(this.dataSourceArray);
  }

  notify(obj:CustomEmitObj){
    this.update.emit(obj);
  }

  editDelete(obj){
    this.edDel.emit(obj);
  }
}
