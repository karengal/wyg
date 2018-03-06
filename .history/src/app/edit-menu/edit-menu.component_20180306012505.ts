import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from '../data.service';

export interface CustomEmitObj {
    element:Object;
    mode:boolean;
}

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})


export class EditMenuComponent {
  @Input() element:number;
  @Output() notify:EventEmitter<CustomEmitObj> = new EventEmitter();
  constructor(private dataService: DataService) { }

  edit(){
    this.notify.emit({element: this.element, mode: true});
  }

  delete(){
    console.log(`edit menu component delete this.element ${this.element}`)
    this.notify.emit({element: this.element, mode: false});
  }
}

