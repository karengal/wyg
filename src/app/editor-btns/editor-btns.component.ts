import { Component, OnInit,Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-editor-btns',
  templateUrl: './editor-btns.component.html',
  styleUrls: ['./editor-btns.component.css']
})
export class EditorBtnsComponent implements OnInit {

  constructor() { }
@Output() addCat: EventEmitter<any> = new EventEmitter();
@Output() addRoom: EventEmitter<any> = new EventEmitter();
  ngOnInit() {
  }
  openDialogCategories(){
    this.addCat.emit();
  }

  openDialog(){
    this.addRoom.emit();
  }
}
