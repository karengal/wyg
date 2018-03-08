import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomModel } from '../models/RoomModel';
import { CategoryModel } from '../models/CategoryModel';
import { DataService } from '../data.service';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.css']
})
export class AddRoomDialogComponent implements OnInit {
  form: FormGroup;
  openDialogRefCat: MatDialogRef<AddCategoryDialogComponent>;
  categories: {category_id:number, category_name: string}[];

  constructor(private dataService: DataService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddRoomDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCatagories();
    this.dataService.getAddedCategoryEmmiter().subscribe(
      ()=>{this.getCatagories()})
      this.form = this.formBuilder.group({
        room_id:'', 
        name: new FormControl('',[Validators.required]),
        category: new FormControl('',[Validators.required]),
        description: '',
        beds: new FormControl('',[Validators.required]),
      })
  }

  getCatagories(){
    this.dataService.getCategories().subscribe(
      data=>{
       console.log(data);
       this.categories = data;
      }
    ),error=>console.log('error');
  }

  submit(form){
    let room = new RoomModel(form.value);
    console.log(room);
    this.dialogRef.close(room);
  }

  openDialogCategories(){
    this.openDialogRefCat = this.dialog.open(AddCategoryDialogComponent);
    this.openDialogRefCat
    .afterClosed()
    .subscribe(
      result=> {
        
        this.dataService.addCategory(result).subscribe(
          data=>{
            this.dataService.categoryWasAdded();
          }
        ), error=>console.log('error');
      }
    ), error=> console.log('error')
  };


}
