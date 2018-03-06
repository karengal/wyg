import { Component, OnInit, Input } from '@angular/core';
import { RoomModel } from '../models/RoomModel';


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
  dataSourceArray = new Array();;
  displayedColumns = new Array();

  

  ngOnInit() {
this.dataSourceArray.push(this.dataSource)
    this.displayedColumns = this.columns;
    console.log(this.dataSource);
    console.log(this.displayedColumns);
    console.log(this.numbersArray);
/*     this.dataSource = ELEMENT_DATA;
 */  }



}
