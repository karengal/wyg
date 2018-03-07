import { Component, OnInit, Input } from '@angular/core';
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
  year;
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.year = this.date.db_date.splice(0, 4);
    console.log(this.year);
  }

  clickedDate(){
    this.isClassVisible = !this.isClassVisible;
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000,
      data: {message: `Bed ${this.bed.bedNum} on ${this.date.month_name} ${this.date.dayNum}, ${this.year}`}
    });
  }

}
