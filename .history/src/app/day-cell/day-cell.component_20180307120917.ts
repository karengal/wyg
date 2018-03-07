import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.css']
})
export class DayCellComponent implements OnInit {
  isClassVisible = false;
  @Input() bed;
  constructor() { }

  ngOnInit() {
    console.log(this.bed)
  }

  clickedDate(){
    this.isClassVisible = !this.isClassVisible;
  }

}
