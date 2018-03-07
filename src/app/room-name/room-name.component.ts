import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomEmitObj } from '../edit-menu/edit-menu.component';
import { RoomModel } from '../models/RoomModel';

@Component({
  selector: 'app-room-name',
  templateUrl: './room-name.component.html',
  styleUrls: ['./room-name.component.css']
})
export class RoomNameComponent implements OnInit {
  @Output() update:EventEmitter<CustomEmitObj> = new EventEmitter();
  @Output() notify:EventEmitter<CustomEmitObj> = new EventEmitter();
  @Input() element:RoomModel;
  @Input() id:number;



  constructor() { }

  ngOnInit() {
  }


  notifyInner(obj:CustomEmitObj){
    this.update.emit(obj);
  }

  handleEdit(obj){
    this.notify.emit(obj)
  }
}
