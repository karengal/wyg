import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})

interface CustomEmitObj {
    element:Object;
    mode:boolean;
}

export class EditMenuComponent {
  @Input() element:Object;
  @Output() notify:EventEmitter<CustomEmitObj> = new EventEmitter();
  constructor(private dataService: DataService) { }

  edit(){
    this.notify.emit({element: this.element, mode: true});
  }

  delete(){
    this.notify.emit({element: this.element, mode: false});
  }
}
