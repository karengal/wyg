import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from '../data.service';
import { RoomModel } from '../models/RoomModel';

export interface CustomEmitObj {
    id: number;
    element:Object;
    mode:boolean;
}

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})


export class EditMenuComponent {
  @Input() element:RoomModel;
  @Input() id:number;
  @Output() notify:EventEmitter<CustomEmitObj> = new EventEmitter();
  @Output() editDelete: EventEmitter<any> = new EventEmitter();
  constructor(private dataService: DataService) { }

  edit(){
    this.editDelete.emit({id: this.id, element: this.element, mode: true});
  }

  delete(){
    this.editDelete.emit({id: this.id, element: this.element, mode: false});
  }

  openMenu(obj:CustomEmitObj){
    this.notify.emit(obj)
  }
}

