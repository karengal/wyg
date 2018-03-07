import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-day-cell',
  templateUrl: './day-cell.component.html',
  styleUrls: ['./day-cell.component.css']
})
export class DayCellComponent {
  isClassVisible = false;
  @Input() bed;
  @Input() date;
  @Input() room;
  constructor(public snackBar: MatSnackBar) { }

  clickedDate(){
    this.isClassVisible = !this.isClassVisible;
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000,
      data: {message: `Bed number ${this.bed.bedNum} on ${this.date.month_name} ${this.date.dayNum} in room '${this.room}'`}
    });
  }

}
