import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.css']
})
export class DayCellComponent implements OnInit {
  isClassVisible = false;
  @Input() bed;
  @Input() date;
  @Input() room;
  year;
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit(){
    this.year = new Date(this.date.db_date).getFullYear()
  }

  clickedDate(){
    this.isClassVisible = !this.isClassVisible;
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: {message: `Bed number ${this.bed.bedNum} on ${this.date.month_name} ${this.date.dayNum} in room '${this.room}'`}
    });
  }

}
