import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.css']
})
export class DayCellComponent implements OnInit {
  isClassVisible = false;
  @Input() bed;
  @Input() date;
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(JSON.stringify(this.bed))
    console.log(JSON.stringify(this.date))
  }

  clickedDate(){
    this.isClassVisible = !this.isClassVisible;
  }

}
